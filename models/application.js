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

    save() {
        if (this.applicationId) {
            //updating
        } else {
            const applicationDoc = {
                userData: this.userData,
                applicationData: this.applicationData,
                date: new Date(),
                status: this.status
            };
            return db.getDb().collection('applications').insertOne(applicationDoc);
        }
    }

}

module.exports = Application;