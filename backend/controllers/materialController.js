const path = require("path"); // Core Node.js module for file path handling
const Material = require("../models/Material"); // Import Material model

// @desc Upload and save a PDF file reference
// @route POST /api/material/upload
// @access Private
export const uploadMaterial = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Check if user info is present
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access. User not found." });
    }

    // Create new Material document
    const material = new Material({
      user: req.user.id, // Associate uploaded material with the user
      filename: req.file.filename, // Saved filename on server
      originalname: req.file.originalname, // Original uploaded filename
      path: req.file.path, // File path on server
      uploadDate: new Date() // Current upload date
    });

    // Save material record to database
    await material.save();

    // Send success response
    res.status(201).json({ message: "Material uploaded successfully!", material });
  } catch (error) {
    console.error("Material Upload Error:", error); // Log full error
    res.status(500).json({ message: "Server error occurred while uploading material." });
  }
};

// @desc Get all materials uploaded by the user
// @route GET /api/material/my-materials
// @access Private
export const getMyMaterials = async (req, res) => {
  try {
    // Check if user info is present
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access. User not found." });
    }

    // Find all materials uploaded by the logged-in user, sorted by latest first
    const materials = await Material.find({ user: req.user.id }).sort({ uploadDate: -1 });

    // Send materials list as response
    res.json(materials);
  } catch (error) {
    console.error("Fetch Materials Error:", error); // Log full error
    res.status(500).json({ message: "Server error occurred while fetching materials." });
  }
};

// module.exports = {
//   uploadMaterial,
//   getMyMaterials
// };
