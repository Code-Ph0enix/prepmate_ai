const express = require('express'); // Import express
const router = express.Router(); // Initialize router
const jwt = require('jsonwebtoken'); // Import JWT
const User = require('../models/User'); // Import User model

// @desc Register a new user
// @route POST /api/users/register
// @access Public
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Create new user instance
    const user = new User({ email, password });
    await user.save(); // Save user to DB

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send token back
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed' });
  }
});

// @desc Login user and get token
// @route POST /api/users/login
// @access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send token back
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router; // Export router
