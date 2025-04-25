const express = require('express');
const multer = require('multer');
const path = require('path');
const Material = require('../models/Material');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const material = new Material({
      filename: req.file.filename,
      originalname: req.file.originalname,
      uploadedBy: req.user.id
    });
    await material.save();
    res.json({ message: 'File uploaded', material });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

router.get('/my-materials', async (req, res) => {
  try {
    const materials = await Material.find({ uploadedBy: req.user.id });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Fetching failed' });
  }
});

module.exports = router;
