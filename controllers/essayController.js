const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.evaluateEssay = async (req, res) => {
  const { essayText, examType } = req.body;
  try {
    const prompt = `Evaluate the following essay for ${examType}. Provide a score and explain what could be improved. Essay: ${essayText}`;
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4'
    });
    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to evaluate essay.' });
  }
};
