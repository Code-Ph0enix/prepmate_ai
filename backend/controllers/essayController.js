const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import Gemini AI SDK

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Initialize Gemini API with your key
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Select the model (flash version)

// @desc Evaluate Essay based on exam type
// @route POST /api/essay/evaluate
// @access Public
exports.evaluateEssay = async (req, res) => {
  const { essayText, examType } = req.body; // Extract inputs from request body

  // Check if required fields are missing
  if (!essayText || !examType) {
    return res.status(400).json({ error: "Essay text and exam type are required." });
  }

  try {
    // Prepare a detailed evaluation prompt
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

    // Send prompt to AI and get the generated feedback
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedback = response.text(); // Extract text from AI response

    // Send feedback back to client
    res.status(200).json({ result: feedback });
  } catch (err) {
    console.error("Essay Evaluation Error:", err); // Log full error details
    res.status(500).json({ error: "Something went wrong while evaluating essay." }); // Friendly error message
  }
};
