const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

router.get('/jobs', adminController.getJobs);

router.get('/jobs/new', adminController.getNewJob);

router.post('/jobs', imageUploadMiddleware, adminController.createNewJob);

module.exports = router;