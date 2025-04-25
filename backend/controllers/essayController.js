const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // You can also try gemini-1.5-pro if needed

exports.evaluateEssay = async (req, res) => {
  const { essayText, examType } = req.body;

  if (!essayText || !examType) {
    return res.status(400).json({ error: "Essay text and exam type are required." });
  }

  try {
    const prompt = `
You are an experienced ${examType} essay evaluator.

Evaluate this essay based on:
- Clarity
- Structure
- Grammar
- Coherence
- Vocabulary

Also provide:
- A score out of 10
- Constructive feedback for improvement

Essay:
"${essayText}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedback = response.text();

    res.status(200).json({ result: feedback });
  } catch (err) {
    console.error("Essay Eval Error:", err.message);
    res.status(500).json({ error: 'Failed to evaluate essay.' });
  }
};
