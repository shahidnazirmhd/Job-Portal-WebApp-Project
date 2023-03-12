const mongodb = require('mongodb');
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
        this.updateImageData();
        if (jobData._id) {
            this.id = jobData._id.toString();
        }
    }

    static async findById(jobId)  {
        let objJobId;
        try {
            objJobId = new mongodb.ObjectId(jobId);
        } catch (error) {
            error.code = 404;
            throw error;
        }
        const job = await db.getDb().collection('jobs').findOne({ _id: objJobId});
        if (!job) {
            const error = new Error('Could not find product with provided id');
            error.code = 404;
            throw error;
        }
        return new Job(job);
    }

    static async findAll() {
        const jobs = await db.getDb().collection('jobs').find().toArray();
        return jobs.map(function (singleJob) {
            return new Job(singleJob);
        });
    }

    updateImageData() {
        this.imagePath = `job-data/images/${this.image}`;
        this.imageUrl = `/jobs/assets/images/${this.image}`;
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
        if (this.id) {
            const objJobId = new mongodb.ObjectId(this.id); 

            if (!this.image) {
                delete jobData.image;
            }

            await db.getDb().collection('jobs').updateOne({_id: objJobId}, {$set: jobData});
        } else {
            await db.getDb().collection('jobs').insertOne(jobData);
        } 
    }

    async replaceImage(newImage) {
        this.image = newImage;
        this.updateImageData();
    }

    remove() {
        const objJobId = new mongodb.ObjectId(this.id);
        return db.getDb().collection('jobs').deleteOne({_id: objJobId});
    }
}

module.exports = Job;