//all imports
const express = require('express');//import express
const cors = require('cors');//import cors
const dotenv = require('dotenv');//import dotenv
const mongoose = require('mongoose');//mongoose
const geminiRoutes = require('./backend/routes/geminiRoutes');//gemini routes
const essayRoutes = require('./backend/routes/essayRoutes');//essay routes
const planRoutes = require('./backend/routes/planRoutes');//plan routes
const userRoutes = require('./backend/routes/userRoutes');//user routes
const materialRoutes = require('./backend/routes/materialRoutes');//material routes
const authMiddleware = require('./backend/middleware/auth');//middleware ->auth

dotenv.config();
console.log("gemini connected");  // gemini key used.

const app = express();
//this cors part will most likely be changed later on as i will receive cors error after deployment.
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/user', userRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/ai', geminiRoutes); // Public
app.use('/api/essay', essayRoutes); // Public
app.use('/api/plan', planRoutes); // Public

app.get('/', (req, res) => {
  res.send('🧠 PrepMate AI Backend is running!');
});

const PORT = process.env.PORT || 5000;

//mongoose connection established
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
