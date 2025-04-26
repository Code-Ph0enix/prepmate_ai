const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import Gemini SDK

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Initialize Gemini API client
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Choose the AI model (flash or pro)

// @desc Generate an MCQ based on topic, difficulty, and exam
// @route POST /api/ai/generate
// @access Public
exports.generateQuestion = async (req, res) => {
  const { topic, difficulty, exam } = req.body; // Extract input fields

  // Input validation
  if (!topic || !difficulty || !exam) {
    return res.status(400).json({ error: "Topic, difficulty, and exam type are required." });
  }

  try {
    // Create a prompt to generate MCQ
    const prompt = `Generate a ${difficulty} difficulty ${exam} question on "${topic}" with 4 options (A, B, C, D), indicate the correct answer, and provide a brief explanation.`;

    // Send prompt to AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); // Extract the AI's text response

    // Send MCQ back to client
    res.json({ result: text });
  } catch (err) {
    console.error("Generate Question Error:", err); // Log full error details
    res.status(500).json({ error: "Something went wrong while generating the question." }); // Friendly error
  }
};

// @desc Explain whether chosen answer is right/wrong
// @route POST /api/ai/explain
// @access Public
exports.explainAnswer = async (req, res) => {
  const { question, chosenAnswer } = req.body; // Extract input fields

  // Input validation
  if (!question || !chosenAnswer) {
    return res.status(400).json({ error: "Question and chosen answer are required." });
  }

  try {
    // Create a prompt to explain the answer
    const prompt = `The following question was answered:\n\n"${question}"\n\nThe user chose: "${chosenAnswer}". Explain whether the answer is correct or wrong, and provide a detailed explanation.`;

    // Send prompt to AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); // Extract the AI's text response

    // Send explanation back to client
    res.json({ result: text });
  } catch (err) {
    console.error("Explain Answer Error:", err); // Log full error details
    res.status(500).json({ error: "Something went wrong while explaining the answer." }); // Friendly error
  }
};
