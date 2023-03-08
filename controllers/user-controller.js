const User = require('../models/user');

function getSignUp (req, res) {
    res.render('user/auth/signup');
}

async function postSignUp (req, res) {
const user = new User(req.body.email, req.body.password, req.body.fullname, req.body.mobileno, req.body.city);
await user.signup();

res.redirect('/login');
}

function getLogin (req, res) {
    res.render('user/auth/login');
}

module.exports = {
    getSignUp: getSignUp,
    getLogin: getLogin,
    postSignUp: postSignUp
};