const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const openaiRoutes = require('./routes/openaiRoutes');
const essayRoutes = require('./routes/essayRoutes');
const planRoutes = require('./routes/planRoutes');
const userRoutes = require('./routes/userRoutes');
const materialRoutes = require('./routes/materialRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ai', authMiddleware, openaiRoutes);
app.use('/api/essay', authMiddleware, essayRoutes);
app.use('/api/plan', authMiddleware, planRoutes);
app.use('/api/user', userRoutes);
app.use('/api/material', authMiddleware, materialRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));

