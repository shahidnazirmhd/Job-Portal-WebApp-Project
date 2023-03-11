const formInputData = require('../util/admin-form-data');
const Job = require('../models/job');

function getJobs(req, res) {
    if(!res.locals.isAdmin) {
        return res.status(403).render("shared/403");
    }
    res.render('admin/jobs/all-jobs');
}

async function getNewJob(req, res) {
    const formData = await formInputData.getFormInputList();
    res.render('admin/jobs/new-job', {formData: formData});
}

async function createNewJob(req, res, next) {
    const job = new Job({...req.body, image: req.file.filename});
    try {
        await job.save();   
    } catch (error) {
        next(error);
        return;
    }
    res.redirect('/admin/jobs');
}

module.exports = {
    getJobs: getJobs,
    getNewJob: getNewJob,
    createNewJob: createNewJob
};