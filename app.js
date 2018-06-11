const express = require('express');

const app = express();
const path = require('path');

const routes = require('./Routes/Route');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'utils')))
app.set('view engine', 'pug');

app.use('/', routes);

app.listen(8080, () => {
    console.log('App Listening on port 8080!');
});