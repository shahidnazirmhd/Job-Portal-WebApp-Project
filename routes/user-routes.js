const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/signup', userController.getSignUp);

router.post('/signup', userController.postSignUp);

router.get('/login', userController.getLogin);

module.exports = router;