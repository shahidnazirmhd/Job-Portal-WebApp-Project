const mongodbStore = require('connect-mongodb-session');
const expressSession = require('express-session');

function createSessionStore() {
    const MongoDBStore = mongodbStore(expressSession);
    const sessionStore = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'fouz-webApp',
        collection: 'sessions'
      });
      return sessionStore;
}

function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
          maxAge: 60 * 60 * 1000
        }
      };
}

module.exports = createSessionConfig;