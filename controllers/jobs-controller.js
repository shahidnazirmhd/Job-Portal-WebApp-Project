const Job = require('../models/job');
const isApplied = require('../util/apply-check');

async function getAllJobs(req, res, next) {
    try {
        const jobs = await Job.findAll();
        res.render('user/jobs/all-jobs', {jobs: jobs});
    } catch (error) {
        next(error);
    }
}

async function getJobDetails(req, res, next) {
    let job;
    let isApply;
    try {
        job = await Job.findById(req.params.id);
        isApply = await isApplied(res.locals.uid, job.id);
    } catch (error) {
        next(error);
        return;
    }
    
    res.render('user/jobs/job-details', {job: job, isApply: isApply});
}

module.exports = {
    getAllJobs: getAllJobs,
    getJobDetails: getJobDetails
};