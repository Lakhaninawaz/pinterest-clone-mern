require('dotenv').config(); // Load .env variables

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session')
const flash = require("express-flash")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const conn = require('./db/conn');
// const passport = require('passport')

var app = express();
const cors = require("cors");
// const { initializingPassport } = require('./middleware/passportConfig');
// const { isAuthenticated } = require('./controller/user');

var corsOption = {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 ,
  methods: 'GET, POST, DELETE, PUT, PATCH',
}

// initializingPassport(passport)


app.use(expressSession({
    secret: process.env.SECRET, 
    resave: false,  
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true
    }
}))


// app.use(passport.initialize())
// app.use(passport.session()) // calls the deserializeUser function and attaches it to req.user
app.use(flash())

app.use(logger('dev'));
app.use(express.json());

app.use(cors(corsOption))


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

conn().then(()=>{
    app.listen(3000, ()=>{
        console.log("Port running in localhost:3000");
    })
})

module.exports = app;
