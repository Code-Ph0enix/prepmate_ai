const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateQuestion = async (req, res) => {
  const { topic, difficulty, exam } = req.body;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'user', content: `Generate a ${difficulty} difficulty ${exam} question on ${topic} with 4 options and correct answer explained.` }
      ],
      model: 'gpt-4'
    });
    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate question.' });
  }
};

exports.explainAnswer = async (req, res) => {
  const { question, chosenAnswer } = req.body;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'user', content: `The following was answered: ${question}. User chose: ${chosenAnswer}. Explain if it’s right or wrong and why.` }
      ],
      model: 'gpt-4'
    });
    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to explain answer.' });
  }
};
