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
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  methods: 'GET, POST, DELETE, PUT, PATCH',
}

// initializingPassport(passport)


app.use(expressSession({
    secret: process.env.SECRET, 
    resave: false,  
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict'
    }
}))


// app.use(passport.initialize())
// app.use(passport.session()) // calls the deserializeUser function and attaches it to req.user
app.use(flash())

app.use(logger('dev'));
// Increase JSON and URL-encoded payload limits to handle base64 images
app.use(express.json({ limit: '20mb' }));

app.use(cors(corsOption))


app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;

conn().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost:${PORT}`);
    })
}).catch((err)=>{
    console.error("Failed to connect to database:", err);
    process.exit(1);
})

module.exports = app;
