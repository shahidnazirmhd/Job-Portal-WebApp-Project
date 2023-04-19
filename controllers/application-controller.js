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

async function getStatus(req, res, next) {
    try {
        const applications = await Application.findAllforUser(res.locals.uid);

        let formateApplicationArr=[]

        for (const application of applications) {
            const job = await Job.findById(application.applicationData.jobId);
            let formateApplication =Object.assign(application,{
                job
            })
            formateApplicationArr.push(formateApplication)
        }       
     

        res.render('user/status/application-status', { applications: formateApplicationArr });
    } catch (error) {
        next(error);
        return;
    }
}

module.exports = {
    getApplication: getApplication,
    postApplication: postApplication,
    getStatus: getStatus
};