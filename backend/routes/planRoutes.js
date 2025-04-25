const express = require('express');
const router = express.Router();
const { createStudyPlan } = require('../controllers/planController');

router.post('/generate', createStudyPlan);

module.exports = router;

