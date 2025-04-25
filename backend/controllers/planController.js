const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.createStudyPlan = async (req, res) => {
  const { exam, daysLeft, strengths, weaknesses } = req.body;
  try {
    const prompt = `Create a personalized ${exam} study plan for ${daysLeft} days. Focus more on ${weaknesses} and less on ${strengths}.`;
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4'
    });
    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate plan.' });
  }
};