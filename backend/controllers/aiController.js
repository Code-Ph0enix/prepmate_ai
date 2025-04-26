// Import the GoogleGenerativeAI SDK
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables from .env file
require("dotenv").config();

// Initialize Gemini API client with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create a model instance with settings (model name, temperature, etc.)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Fast and affordable model
  generationConfig: {
    temperature: 0.7,        // Controls creativity (0.0 = factual, 1.0 = creative)
    maxOutputTokens: 1000,   // Limits the size of output (prevents overly long replies)
    topP: 1,                 // Controls diversity via nucleus sampling (keep 1 for now)
    topK: 40                 // Limits tokens considered per step (optional tuning)
  }
});

// ==============================
// @desc: Answer doubts via chat
// @route: POST /api/ai/chat
// @access: Public
const askDoubt = async (req, res) => {
  const { prompt } = req.body; // Extract prompt from request body

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" }); // Validate input
  }

  try {
    const result = await model.generateContent(prompt); // Send prompt to Gemini
    const response = await result.response;             // Get full API response
    const text = response.text();                       // Extract plain text output

    res.status(200).json({ response: text });            // Send back to frontend
  } catch (error) {
    console.error("AI Error:", error.message);           // Log any error
    res.status(500).json({ message: "Failed to get AI response" }); // Server error
  }
};

// ==============================
// @desc: Evaluate essay and give feedback
// @route: POST /api/essay/evaluate
// @access: Public
const evaluateEssay = async (req, res) => {
  const { essayText } = req.body; // Extract essay text

  if (!essayText) {
    return res.status(400).json({ message: "Essay text is required" }); // Validate input
  }

  try {
    // Create a structured prompt for evaluation
    const evaluationPrompt = `
You are an IELTS/GRE/TOEFL Essay Evaluator.
Evaluate this essay based on:
- Clarity
- Structure
- Grammar
- Coherence
- Vocabulary
Provide:
- A score out of 10
- Specific suggestions for improvement

Essay: ${essayText}
    `;

    const result = await model.generateContent(evaluationPrompt); // Send evaluation prompt
    const response = await result.response;                      // Get response
    const text = response.text();                                 // Extract text

    res.status(200).json({ feedback: text });                     // Send feedback
  } catch (error) {
    console.error("Essay Eval Error:", error.message);            // Log any error
    res.status(500).json({ message: "Failed to evaluate essay" }); // Server error
  }
};

// ==============================
// @desc: Generate a study plan based on user input
// @route: POST /api/plan/generate
// @access: Public
const generateStudyPlan = async (req, res) => {
  const { exam, daysAvailable, studyHours } = req.body; // Extract inputs

  if (!exam || !daysAvailable || !studyHours) {
    return res.status(400).json({ message: "Missing input fields" }); // Validate input
  }

  try {
    // Create a prompt for study plan generation
    const planPrompt = `
Create a ${exam} study plan for ${daysAvailable} days,
assuming ${studyHours} hours/day.

Include:
- Daily focus topics
- Revision days
- Mock test schedules
- Study strategies
    `;

    const result = await model.generateContent(planPrompt); // Send study plan prompt
    const response = await result.response;                // Get response
    const text = response.text();                           // Extract text

    res.status(200).json({ plan: text });                    // Send generated plan
  } catch (error) {
    console.error("Plan Error:", error.message);             // Log any error
    res.status(500).json({ message: "Failed to generate study plan" }); // Server error
  }
};

// ==============================
// Export all controller functions
module.exports = {
  askDoubt,
  evaluateEssay,
  generateStudyPlan
};
