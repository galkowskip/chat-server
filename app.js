const express = require('express')
const app = express()

const passport = require("./config/passport")

const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require("morgan")

const session = require("express-session")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

//Routes import
const loginRouter = require('./routes/loginRoutes')

app.use(express.static("public"));

app.use(session({
  secret: "secretKey",
  resave: true,
  saveUninitialized: false
}));

app.use(cookieParser())
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('tiny'))

//Routes

app.use('/login', loginRouter)

// io.on('connection', (socket) => {
//   console.log('connect')
//   io.emit('this', {
//     will: 'be received by everyone'
//   });

//   socket.on('connect?', () => {
//     console.log("yup");
//   });

//   socket.on('disconnect', () => {
//     io.emit('user disconnected');
//   });
// });

server.listen(3001);

module.exports = app;