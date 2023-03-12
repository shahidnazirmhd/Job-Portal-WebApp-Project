const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');
const path = require('path');

const db = require('./data/database');
const createSessionConfig = require('./config/session');
const userRoutes = require('./routes/user-routes');
const jobRoutes = require('./routes/job-routes');
const baseRoutes = require('./routes/base-routes');
const adminRoutes = require('./routes/admin-routes');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/jobs/assets', express.static('job-data'));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrf());
app.use(addCsrfTokenMiddleware);

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(userRoutes);
app.use(jobRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function () {
    app.listen(3000);
  }).catch(function (error) {
    console.log('failed to connect to the database');
    console.log(error);
  });