function createUserSession (req, user, action){
    req.session.uid = user._id.toString();
    req.session.save(action);
}

function destroyUserSession(req, action) {
    req.session.uid = null;
    req.session.save(action);
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserSession: destroyUserSession
};