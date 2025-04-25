const path = require("path");
const Material = require("../models/Material");

// @desc Upload and save a PDF file reference
// @route POST /api/material/upload
// @access Private
const uploadMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const material = new Material({
      user: req.user.id,
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      uploadDate: new Date()
    });

    await material.save();
    res.status(201).json({ message: "Material uploaded successfully!", material });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error while uploading material." });
  }
};

// @desc Get all materials uploaded by the user
// @route GET /api/material/my-materials
// @access Private
const getMyMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ user: req.user.id }).sort({ uploadDate: -1 });
    res.json(materials);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Server error while fetching materials." });
  }
};

module.exports = {
  uploadMaterial,
  getMyMaterials
};
