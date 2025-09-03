const express = require('express');
const router = express.Router();
const ResumeController = require('../controller/resume');
const Authentication = require('../authentication/auth');

router.get('/templates', ResumeController.getTemplates);
router.post('/save', Authentication.auth, ResumeController.saveResume);
router.get('/me', Authentication.auth, ResumeController.getResume);
router.get('/user/:id', ResumeController.getResumeByUserId);


module.exports = router;
