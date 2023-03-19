
class Save {
    constructor(jobDocs = []) {
        this.jobDocs = jobDocs;
    }

    saveJob(job) {
        let isSaved;
        for (let i = 0; i < this.jobDocs.length; i++) {
            if (this.jobDocs[i].id === job.id) {
                isSaved = true;
                return;
            }
        }
        if (!isSaved) {
            this.jobDocs.push(job);
        }
    }

    removeSavedJob(jobId) {
        for (let i = 0; i < this.jobDocs.length; i++) {
            if (this.jobDocs[i].id === jobId) {
                this.jobDocs.splice(i, 1);
                return;
            }
        }
    }

}

module.exports = Save;