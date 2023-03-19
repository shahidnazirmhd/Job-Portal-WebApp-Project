 const Job = require('../models/job');

 function getSavedJob(req, res) {
    res.render('user/saved/saved');
 }

 async function saveJob(req, res, next) {
   let job;
    try {
        job = await Job.findById(req.body.jobId);
    } catch (error) {
        next(error);
        return;
    }
    const save = res.locals.save;
    save.saveJob(job);
    req.session.savings = save;

    res.status(201).json({
        message: 'Job Saved!',
        newTotalSaves: save.jobDocs.length
    });
 }

function removeSavedJob (req, res) {
    const save = res.locals.save;
    save.removeSavedJob(req.params.id);
    req.session.savings = save;
    res.json({
        message: 'Job removed!',
        newTotalSaves: save.jobDocs.length
    });
}

 module.exports = {
    saveJob: saveJob,
    getSavedJob: getSavedJob,
    removeSavedJob: removeSavedJob
 }