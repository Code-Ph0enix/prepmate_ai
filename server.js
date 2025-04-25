const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const openaiRoutes = require('./backend/routes/openaiRoutes');
const essayRoutes = require('./backend/routes/essayRoutes');
const planRoutes = require('./backend/routes/planRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const materialRoutes = require('./backend/routes/materialRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();
console.log(process.env.OPENAI_API_KEY);  // Check if OpenAI API key is being loaded

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/user', userRoutes);
app.use('/api/material', authMiddleware, materialRoutes);
app.use('/api/ai', openaiRoutes); // Public
app.use('/api/essay', essayRoutes); // Public
app.use('/api/plan', planRoutes); // Public

app.get('/', (req, res) => {
  res.send('🧠 PrepMate AI Backend is running!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
