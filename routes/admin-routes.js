const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

router.get('/jobs', adminController.getJobs);

router.get('/jobs/new', adminController.getNewJob);

router.get('/jobs/status', adminController.getJobStatus);

router.post('/jobs/status/update/:id', adminController.updateJobStatus);

router.post('/jobs', imageUploadMiddleware, adminController.createNewJob);

router.get('/jobs/:id', adminController.getUpdateJob);

router.post('/jobs/:id', imageUploadMiddleware, adminController.updateJob);

router.delete('/jobs/:id', adminController.deleteJob);

module.exports = router;