const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import Gemini API package
require('dotenv').config(); // Load environment variables

// Initialize Gemini API instance
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Select the model to use
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // or 'gemini-1.5-pro'

// @desc Generate a personalized study plan
// @route POST /api/plan/create
// @access Public
exports.createStudyPlan = async (req, res) => {
  const { exam, daysLeft, strengths, weaknesses } = req.body; // Destructure request body

  // Basic validation to check if necessary fields are present
  if (!exam || !daysLeft || !strengths || !weaknesses) {
    return res.status(400).json({ error: "Exam, days left, strengths, and weaknesses are required." });
  }

  try {
    // Create a prompt string to send to the Gemini model
    const prompt = `
Create a personalized ${exam} study plan for ${daysLeft} days.

- Focus more on the following weak areas: ${weaknesses}.
- Focus less on these stronger areas: ${strengths}.
- The plan should be realistic and broken down daily.
- Suggest revision and mock test days too.
    `;

    // Generate study plan content using Gemini
    const result = await model.generateContent(prompt);

    // Get the response from the model
    const response = await result.response;

    // Extract the text content from the response
    const text = response.text();

    // Send the generated study plan back to the client
    res.json({ result: text });
  } catch (err) {
    console.error("Create Study Plan Error:", err.message); // Log specific error message
    res.status(500).json({ error: 'Failed to generate study plan.' }); // Return 500 error to client
  }
};
