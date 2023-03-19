const express = require('express');
const router = express.Router();
const saveController = require('../controllers/save-controller');

router.get('/', saveController.getSavedJob);

router.post('/docs', saveController.saveJob);

router.delete('/docs/:id', saveController.removeSavedJob);

module.exports = router;