const Job = require('../models/job');
const Application = require('../models/application');
const User = require('../models/user');

async function getApplication (req, res, next) {
    try {
        const job = await Job.findById(req.params.id);
        res.render('user/jobs/job-application', {job: job});
    } catch (error) {
        next(error);
    }
}

async function postApplication (req, res, next) {
    const applicationData = {
        ...req.body,
        resume: req.file.filename,
        jobId: req.params.id
    };
    let userDoc;
    try {
        userDoc = await User.findById(res.locals.uid);
    } catch (error) {
       return next(error);
    }

    const application = new Application(applicationData, userDoc);

    try {
        await application.save();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/application/status');
}

function getStatus(req, res) {
    res.render('user/status/application-status');
}

module.exports = {
    getApplication: getApplication,
    postApplication: postApplication,
    getStatus: getStatus
};