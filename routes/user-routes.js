const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/signup', userController.getSignUp);

router.post('/signup', userController.postSignUp);

router.get('/login', userController.getLogin);

router.post('/login', userController.postLogin);

router.post('/logout', userController.logout);

module.exports = router;