const express = require('express');
const router = express.Router();
const { evaluateEssay } = require('../controllers/essayController');

router.post('/evaluate', evaluateEssay);

module.exports = router;
