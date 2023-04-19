const Job = require('../models/job');
const Application = require('../models/application');

async function getJobStatus(req, res, next) {
    try {
        const applications = await Application.findAll();
        let formateApplicationArr=[]

        for (const application of applications) {
            const job = await Job.findById(application.applicationData.jobId);
            let formateApplication =Object.assign(application,{
                job
            })
            formateApplicationArr.push(formateApplication)
        }
        res.render('admin/jobs/manage-job', { applications: formateApplicationArr });
    } catch (error) {
        next(error);
        return;
    }
}

async function updateJobStatus(req, res, next) {
    await Application.updateStatus(req.params.id, req.body.status)
    try {   
        res.redirect('/admin/jobs/status');
    } catch (error) {
        next(error);
        return;
    }
}

async function getJobs(req, res, next) {
    try {
        const jobs = await Job.findAll();
        res.render('admin/jobs/all-jobs', {jobs: jobs});
    } catch (error) {
        next(error);
        return;
    }
}

async function getNewJob(req, res) {
    res.render('admin/jobs/new-job');
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

async function getUpdateJob(req, res, next) {
    try {
        const job = await Job.findById(req.params.id);
        res.render('admin/jobs/update-job', {job: job});
    } catch (error) {
        next(error);
    }
}

async function updateJob(req, res, next) {
    const job = new Job({
        ...req.body,
        _id: req.params.id
    });
    if (req.file) {
        job.replaceImage(req.file.filename);
    }
    try {
        await job.save();
    } catch (error) {
        next(error);
        return;
    }
    res.redirect('/admin/jobs');
}

async function deleteJob(req, res, next) {
    try {
        const job = await Job.findById(req.params.id);
        await job.remove();
    } catch (error) {
       return next(error);        
    }
    res.json({message: 'Job deleted!'});
} 

module.exports = {
    getJobs: getJobs,
    getNewJob: getNewJob,
    createNewJob: createNewJob,
    getUpdateJob: getUpdateJob,
    updateJob: updateJob,
    deleteJob: deleteJob,
    getJobStatus: getJobStatus,
    updateJobStatus: updateJobStatus
};