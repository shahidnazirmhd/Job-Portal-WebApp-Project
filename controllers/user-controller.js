function getSignUp (req, res) {
    res.render('user/auth/signup');
}

function getLogin (req, res) {

}

module.exports = {
    getSignUp: getSignUp,
    getLogin: getLogin
};