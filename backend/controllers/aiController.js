const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // use gemini-pro or gemini-1.5-flash

// @desc Answer doubts via chat
// @route POST /api/ai/chat
// @access Public
const askDoubt = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: "Prompt is required" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ message: "Failed to get AI response" });
  }
};

// @desc Essay evaluation
// @route POST /api/essay/evaluate
// @access Public
const evaluateEssay = async (req, res) => {
  const { essayText } = req.body;
  if (!essayText) return res.status(400).json({ message: "Essay text is required" });

  try {
    const evaluationPrompt = `
You are an IELTS/GRE/TOEFL Essay Evaluator.
Evaluate this essay based on clarity, structure, grammar, coherence, and vocabulary.
Give a score out of 10 and suggestions for improvement.

Essay: ${essayText}
    `;
    const result = await model.generateContent(evaluationPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ feedback: text });
  } catch (error) {
    console.error("Essay Eval Error:", error.message);
    res.status(500).json({ message: "Failed to evaluate essay" });
  }
};

// @desc Generate study plan
// @route POST /api/plan/generate
// @access Public
const generateStudyPlan = async (req, res) => {
  const { exam, daysAvailable, studyHours } = req.body;
  if (!exam || !daysAvailable || !studyHours) {
    return res.status(400).json({ message: "Missing input fields" });
  }

  try {
    const planPrompt = `
Create a ${exam} study plan for ${daysAvailable} days, assuming ${studyHours} hours/day.
Include:
- Daily focus topics
- Revision days
- Mock tests and strategies
    `;
    const result = await model.generateContent(planPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ plan: text });
  } catch (error) {
    console.error("Plan Error:", error.message);
    res.status(500).json({ message: "Failed to generate study plan" });
  }
};

module.exports = {
  askDoubt,
  evaluateEssay,
  generateStudyPlan
};
