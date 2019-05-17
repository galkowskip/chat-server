require("dotenv").config();

const express = require("express");
const passportSocketIo = require("passport.socketio");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { passport } = require("./src/passport");
const { SocketObserver } = require("./src/socketIo");
const { loginRouter } = require("./src/routes/loginRoutes");
const { mongoStore } = require("./src/mongodb");

/**
 * Use this class to start server
 * @class
 * @param {Express} app main express app, used by http.server to start app
 * @param {*} server http.server
 * @param {socketIO.server} io socket.io websocket manager
 */
class Server {
  constructor(app, server, io) {
    this.app = app;
    this.server = server;
    this.io = io;
    this.socketObserver;
    this.port = process.env.PORT || 3001;

    this.setUpServer();
  }
  /**
   *  app setup and config
   */
  setUpServer() {
    this.app.use(express.static("client/build"));

    this.app.use(
      session({
        key: "expres.sid",
        secret: process.env.SESSION_SECRET,
        store: mongoStore,
        resave: false,
        saveUninitialized: false
      })
    );

    this.app.use(morgan("tiny"));

    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use("/login", loginRouter);

    this.io.use(
      passportSocketIo.authorize({
        cookieParser: cookieParser,
        key: "expres.sid",
        secret: process.env.SESSION_SECRET,
        store: mongoStore
      })
    );
    this.io.on("connection", socket => {
      this.socketObserver = new SocketObserver(socket, mongoStore, this.io);
      this.socketObserver.observeAll();
    });
  }
  /**
   * server start listening
   */
  startServer() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const App = new Server(app, server, io);

App.startServer();

module.exports = { App };
