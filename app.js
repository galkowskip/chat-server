const express = require("express");
const app = express();

const passport = require("./config/passport");
const passportSocketIo = require("passport.socketio");

const server = require("http").Server(app);
const io = require("socket.io")(server);
const morgan = require("morgan");

const SocketObserver = require("./config/socketIo")

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const db = require('./config/mongodb')

const mongoStore = require("./config/mongoStore")

//Routes import
const loginRouter = require("./routes/loginRoutes");

app.use(express.static("client/build"));

app.use(
  session({
    key: "expres.sid",
    secret: "secretKey",
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
    secret: "secretKey",
    store: mongoStore,
  })
);

io.on("connection", socket => {
  socketObserver = new SocketObserver(socket, mongoStore, io)
  socketObserver.observeAll()
});

server.listen(3001);

module.exports = app;