const Save = require('../models/save');

function initializeSavedJob(req, res, next) {
    if (res.locals.isAuth && !res.locals.isAdmin) {
        let save;
        if (!req.session.savings) {
            save = new Save();
        } else {
            save = new Save(req.session.savings.jobDocs);
        }
        res.locals.save = save;
    }
    next();
}

module.exports = initializeSavedJob;