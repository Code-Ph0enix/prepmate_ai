const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // or use gemini-1.5-pro

// @desc Generate MCQ question
// @route POST /api/ai/generate
// @access Public
exports.generateQuestion = async (req, res) => {
  const { topic, difficulty, exam } = req.body;

  try {
    const prompt = `Generate a ${difficulty} difficulty ${exam} question on "${topic}" with 4 options (A, B, C, D), indicate the correct answer, and provide a brief explanation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ result: text });
  } catch (err) {
    console.error("Generate Question Error:", err.message);
    res.status(500).json({ error: 'Failed to generate question.' });
  }
};

// @desc Explain answer
// @route POST /api/ai/explain
// @access Public
exports.explainAnswer = async (req, res) => {
  const { question, chosenAnswer } = req.body;

  try {
    const prompt = `The following question was answered:\n\n"${question}"\n\nThe user chose: "${chosenAnswer}". Explain whether the answer is right or wrong, and give a detailed explanation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ result: text });
  } catch (err) {
    console.error("Explain Answer Error:", err.message);
    res.status(500).json({ error: 'Failed to explain answer.' });
  }
};
