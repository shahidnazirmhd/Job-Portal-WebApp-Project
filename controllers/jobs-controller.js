const Job = require('../models/job');

async function getAllJobs(req, res, next) {
    try {
        const jobs = await Job.findAll();
        res.render('user/jobs/all-jobs', {jobs: jobs});
    } catch (error) {
        next(error);
    }
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