const User = require('../models/user');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');

function getSignUp (req, res) {
    res.render('user/auth/signup');
}

async function postSignUp (req, res, next) {
   if (!validation.userDetailsAreValid(req.body.email, req.body.password, req.body.fullname, req.body['confirm-email'], req.body.mobileno, req.body.city)) {
    res.redirect('signup');
    return;
   } 
const user = new User(req.body.email, req.body.password, req.body.fullname, req.body.mobileno, req.body.city);
try{
    const existAlready = await user.existsAlready();
    if (existAlready) {
        res.redirect('signup');
        return;
    }
    
    await user.signup();
} catch (error) {
    next(error);
    return;
}

res.redirect('/login');
}

function getLogin (req, res) {
    res.render('user/auth/login');
}

async function postLogin (req, res, next) {
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try {
    existingUser = await user.getUserWithSameEmail();
    } catch (error) {
    next(error);
    return;
}

    if (!existingUser) {
        res.redirect('/login');
        return;
    }

    const passwordIsCorrect = await user.hasPasswordMatch(existingUser.password);

    if (!passwordIsCorrect) {
        res.redirect('/login');
        return;
    }

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect('/');
    });
}

function logout (req, res) {
    authUtil.destroyUserSession(req, function () {
        res.redirect('/login');
    });
}

module.exports = {
    getSignUp: getSignUp,
    getLogin: getLogin,
    postSignUp: postSignUp,
    postLogin: postLogin,
    logout: logout
};