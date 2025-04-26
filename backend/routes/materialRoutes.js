const express = require('express'); // Import express
const multer = require('multer'); // Import multer for file uploads
const router = express.Router(); // Initialize router
// const Material = require('../models/Material'); // Import Material model
const { uploadMaterial, getMyMaterials } = require('../controllers/materialController'); // Import controllers
const { protect } = require('../middleware/auth'); // Import auth middleware (you should create this if not yet)

// Configure multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/'), // Set upload folder
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`) // Set unique filename
});

// Initialize multer with defined storage
const upload = multer({ storage });

// Upload route - private
router.post('/upload', protect, upload.single('file'), uploadMaterial);

// Get user's materials - private
router.get('/my-materials', protect, getMyMaterials);

module.exports = router; // Export router
