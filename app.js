const express = require('express');
const csrf = require('csurf');
const path = require('path');

const db = require('./data/database');
const userRoutes = require('./routes/user-routes');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(csrf());
app.use(addCsrfTokenMiddleware);

app.use(userRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function () {
    app.listen(3000);
  }).catch(function (error) {
    console.log('failed to connect to the database');
    console.log(error);
  });