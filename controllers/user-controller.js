const User = require('../models/user');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');

function getSignUp (req, res) {
    let sessionData = sessionFlash.getSessionErrorData(req);
    if(!sessionData) {
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            name: '',
            mobileNo: '',
            city: ''
        };
    }
    res.render('user/auth/signup', {inputData: sessionData});
}

async function postSignUp (req, res, next) {
    const enteredData = {
        email: req.body.email,
        confirmEmail: req.body['confirm-email'],
        password: req.body.password,
        name: req.body.fullname,
        mobileNo: req.body.mobileno,
        city: req.body.city
    };
   if (!validation.userDetailsAreValid(enteredData.email, enteredData.password, enteredData.name, enteredData.confirmEmail, enteredData.mobileNo, enteredData.city)) {
    sessionFlash.flashErrorsToSession(req, {
        errorMessage: 'please correct your data.',
        ...enteredData
    }, function () {
        res.redirect('/signup');
    });
    return;
   } 
const user = new User(enteredData.email, enteredData.password, enteredData.name, enteredData.mobileNo, enteredData.city);
try{
    const existAlready = await user.existsAlready();
    if (existAlready) {
        sessionFlash.flashErrorsToSession(req, {
            errorMessage: 'User exists already!',
            ...enteredData
        }, function () {
            res.redirect('/signup');
        });
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
    let sessionData = sessionFlash.getSessionErrorData(req);
    if(!sessionData) {
        sessionData = {
            email: '',
            password: ''
        };
    }
    res.render('user/auth/login', {inputData: sessionData});
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
    const sessionErrorData = {
        errorMessage: 'Enter correct credentials',
            email: user.email,
            password: user.password
    };
    if (!existingUser) {
        sessionFlash.flashErrorsToSession(req, sessionErrorData, function () {
            res.redirect('/login');
        });
        return;
    }

    const passwordIsCorrect = await user.hasPasswordMatch(existingUser.password);

    if (!passwordIsCorrect) {
        sessionFlash.flashErrorsToSession(req, sessionErrorData, function () {
            res.redirect('/login');
        });
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