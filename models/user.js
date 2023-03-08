const bcrypt = require('bcryptjs');
const db = require('../data/database');

class User {
    constructor(email, password, fullname, mobileno, city) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.mobileno = mobileno;
        this.city = city;
    }

    async signup() {
       const hashedPassword = await bcrypt.hash(this.password, 12); 
       await db.getDb().collection('users').insertOne({
            fullname: this.fullname,
            email: this.email,
            password: hashedPassword,
            mobileno: this.mobileno,
            city: this.city
        });
    }
}

module.exports = User;