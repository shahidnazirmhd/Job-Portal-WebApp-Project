const Job = require('../models/job');

async function getAllJobs(req, res, next) {
    let jobs
    try {
        jobs = await Job.findAll();
    } catch (error) {
        next(error);
    }
    res.render('user/jobs/all-jobs', {jobs: jobs});
}

async function getJobDetails(req, res, next) {
    try {
        const job = await Job.findById(req.params.id);
        res.render('user/jobs/job-details', {job: job});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllJobs: getAllJobs,
    getJobDetails: getJobDetails
};