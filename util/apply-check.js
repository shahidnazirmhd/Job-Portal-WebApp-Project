const Application = require('../models/application');

async function isApplied(uid, jobid) {
    const applications = await Application.findAllforUser(uid);
    let isApplied = false;
    for (let i = 0; i < applications.length; i++) {
        if (applications[i].applicationData.jobId === jobid) {
            isApplied = true;
        }
    }
    return isApplied;
}

module.exports = isApplied;