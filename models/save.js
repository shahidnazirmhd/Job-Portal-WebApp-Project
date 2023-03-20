
class Save {
    constructor(jobDocs = []) {
        this.jobDocs = jobDocs;
    }

    saveJob(job) {
        let isSaved;
        for (let i = 0; i < this.jobDocs.length; i++) {
            if (this.jobDocs[i].id === job.id) {
                isSaved = true;
                this.jobDocs.splice(i, 1);
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

    isSaved(jobId) {
        let isSaved = false;
        for (let i = 0; i < this.jobDocs.length; i++) {
            if (this.jobDocs[i].id === jobId) {
                isSaved = true;
            }
        }
        return isSaved;
    }

}

module.exports = Save;