const db = require('../data/database');

class Job {
    constructor(jobData) {
        this.title = jobData.title;
        this.companyname = jobData.companyname;
        this.location = jobData.location;
        this.summary = jobData.summary;
        this.description = jobData.description;
        this.experience = jobData.experience;
        this.salary = jobData.salary;
        this.jobtype = jobData.jobtype;
        this.worktype = jobData.worktype;
        this.interviewtype = jobData.interviewtype;
        this.image = jobData.image;
        this.imagePath = `job-data/images/${jobData.image}`;
        this.imageUrl = `/jobs/assets/images/${jobData.image}`;
    }

    async save() {

        const jobData = {
        title: this.title,
        companyname: this.companyname,
        location: this.location,
        summary: this.summary,
        description: this.description,
        experience: this.experience,
        salary: this.salary,
        jobtype: this.jobtype,
        worktype: this.worktype,
        interviewtype: this.interviewtype,
        image: this.image
        };

        await db.getDb().collection('jobs').insertOne(jobData);
    }
}

module.exports = Job;