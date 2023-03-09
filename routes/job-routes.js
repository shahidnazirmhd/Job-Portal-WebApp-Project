const express = require('express');
const router = express.Router();

router.get('/jobs', function (req, res) {
    res.render('user/jobs/all-jobs');
});

module.exports = router;