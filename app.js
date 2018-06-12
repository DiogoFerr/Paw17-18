const express = require('express');
const bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');

const app = express();
const path = require('path');
const routes = require('./Routes/Route');
//Middleware to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
//Middleware to sanitize data
app.use(expressSanitizer());

app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'utils')))
app.set('view engine', 'pug');

app.use('/', routes);

app.listen(8080, () => {
    console.log('App Listening on port 8080!');
});