const Job = require('../models/job');

async function getApplication (req, res, next) {
    try {
        const job = await Job.findById(req.params.id);
        res.render('user/jobs/job-application', {job: job});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getApplication: getApplication
};