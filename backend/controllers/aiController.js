const { OpenAIApi, Configuration } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.GEMINI_API_KEY
});

const openai = new OpenAIApi(configuration);

// @desc Answer doubts via chat
// @route POST /api/ai/chat
// @access Public
const askDoubt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ message: "Prompt is required" });

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ response: reply });
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
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

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: evaluationPrompt }]
    });

    const feedback = response.data.choices[0].message.content;
    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Essay Eval Error:", error.response?.data || error.message);
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

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: planPrompt }]
    });

    const plan = response.data.choices[0].message.content;
    res.status(200).json({ plan });
  } catch (error) {
    console.error("Plan Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate study plan" });
  }
};

module.exports = {
  askDoubt,
  evaluateEssay,
  generateStudyPlan
};
