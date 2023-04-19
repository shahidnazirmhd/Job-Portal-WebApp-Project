const mongodb = require('mongodb');
const db = require('../data/database');

class Application {
    constructor(applicationData, userData, status = 'pending', date, applicationId) {
        this.applicationData = applicationData;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        this.applicationId = applicationId;
    }

    static transformApplicationDoc(applicationDoc) {
        return new Application(
            applicationDoc.applicationData,
            applicationDoc.userData,
            applicationDoc.status,
            applicationDoc.date,
            applicationDoc._id,
        );
    }

    static transformApplicationDocs(applicationDocs) {
        return applicationDocs.map(this.transformApplicationDoc);
    }

    static async findAll() {
        const applications = await db.getDb().collection('applications').find().sort({ _id: -1 }).toArray();
        return this.transformApplicationDocs(applications);
    }

    static async findAllforUser(userId) {
        const uid = new mongodb.ObjectId(userId);
        const applications = await db.getDb().collection('applications').find({ 'userData._id': uid }).sort({ _id: -1 }).toArray();
        return this.transformApplicationDocs(applications);
    }

    static async findById(applicationId) {
        const application = await db.getDb().collection('applications').findOne({ _id: new mongodb.ObjectId(applicationId) });
        return this.transformApplicationDoc(application);
    }

    static async updateStatus(applicationId, updatedStatus) {
        const reapplicationId = new mongodb.ObjectId(applicationId);
        return db.getDb().collection('applications').updateOne({ _id: reapplicationId }, {$set: { status: updatedStatus }});
        
    }


    save() {

            const applicationDoc = {
                userData: this.userData,
                applicationData: this.applicationData,
                date: new Date(),
                status: this.status
            };
            return db.getDb().collection('applications').insertOne(applicationDoc);
    }

}

module.exports = Application;