require("dotenv").config();

const express = require("express");
const passportSocketIo = require("passport.socketio");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { passport } = require("./src/passport");
const { SocketObserver } = require("./src/socketIo");
const { loginRouter } = require("./routes/loginRoutes");
const { mongoStore } = require("./src/mongodb");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const createServer = () => {
  app.use(express.static("client/build"));

  app.use(
    session({
      key: "expres.sid",
      secret: process.env.SESSION_SECRET,
      store: mongoStore,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(morgan("tiny"));

  app.use(passport.initialize());
  app.use(passport.session());

  //Routes
  app.use("/login", loginRouter);

  io.use(
    passportSocketIo.authorize({
      cookieParser: cookieParser,
      key: "expres.sid",
      secret: process.env.SESSION_SECRET,
      store: mongoStore
    })
  );

  io.on("connection", socket => {
    socketObserver = new SocketObserver(socket, mongoStore, io);
    socketObserver.observeAll();

    socket;
  });

  const port = process.env.PORT || 3001;

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

module.exports = createServer();
