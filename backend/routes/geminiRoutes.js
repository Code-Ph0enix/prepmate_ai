const express = require('express');
const router = express.Router();
const { generateQuestion, explainAnswer } = require('../controllers/geminiController');

router.post('/generate-question', generateQuestion);
router.post('/explain-answer', explainAnswer);

module.exports = router;
