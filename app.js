const express = require('express');
const bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');
const session = require('express-session');
const expressValidator = require('express-validator');
const app = express();

//PASSPORT AUTH
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const path = require('path');
const routes = require('./routes/route');
const users = require('./routes/users');

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Set statci folder
app.use('/static', express.static(path.join(__dirname, 'utils')))

//Middleware to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware to sanitize data
app.use(expressSanitizer());

//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//PASSPORT init
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());


//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//Routes
app.use('/', routes);
app.use('/users', users);

app.listen(8081, () => {
    console.log('App Listening on port 8080!');
});