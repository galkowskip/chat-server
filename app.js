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

app.use(express.static("client/build"))

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
// app.get('*', (req, res) => {
//   res.sendFile('/client/build/index.html')
// })

if (process.env.NODE_ENV === 'production') {
  console.log('production')
}
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

  socket
});


const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

module.exports = app;