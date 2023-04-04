const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application-controller');
const resumeUploadMiddleware = require('../middlewares/resume-upload');

router.get('/apply/:id', applicationController.getApplication);
router.post('/submit/:id', resumeUploadMiddleware, applicationController.postApplication);
router.get('/status', applicationController.getStatus);

module.exports = router;