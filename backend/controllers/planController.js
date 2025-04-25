const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // or gemini-1.5-pro if you're on that

exports.createStudyPlan = async (req, res) => {
  const { exam, daysLeft, strengths, weaknesses } = req.body;

  try {
    const prompt = `
Create a personalized ${exam} study plan for ${daysLeft} days.

- Focus more on the following weak areas: ${weaknesses}.
- Focus less on these stronger areas: ${strengths}.
- The plan should be realistic and broken down daily.
- Suggest revision and mock test days too.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ result: text });
  } catch (err) {
    console.error("Study Plan Error:", err.message);
    res.status(500).json({ error: 'Failed to generate plan.' });
  }
};
