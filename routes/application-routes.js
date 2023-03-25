const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application-controller');

router.get('/application/:id', applicationController.getApplication);

module.exports = router;