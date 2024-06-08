const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure `multer` to save uploaded files to a specific directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Create a `multer` instance with the defined storage configuration
const upload = multer({ storage });
