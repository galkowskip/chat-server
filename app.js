const express = require('express')
const app = express()

const passport = require('passport')
const passportConfig = require('./config/passport')

const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require("morgan")

const session = require("express-session")
const bodyParser = require("body-parser");

//Routes import
const loginRouter = require('./routes/loginRoutes')


app.use('/login', loginRouter)

app.use(express.static("public"));

app.use(session({
  secret: "secretKey",
  resave: true,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('tiny'))

server.listen(3001);
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
  res.send('123')
});

io.on('connection', (socket) => {
  console.log('connect')
  io.emit('this', {
    will: 'be received by everyone'
  });

  socket.on('connect?', () => {
    console.log("yup");
  });

  socket.on('disconnect', () => {
    io.emit('user disconnected');
  });
});