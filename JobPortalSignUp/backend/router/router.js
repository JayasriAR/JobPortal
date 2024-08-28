const express = require('express');
const { signup } = require('../controller/controller');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File filter for PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        req.fileValidationError = 'Only PDF files are allowed';
        cb(null, false, new Error('Only PDF files are allowed'));
    }
};

// Initialize multer with storage and file filter
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB size limit
});

// Route for user signup
router.post('/signup', 
    upload.single('resume'),
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('phone', 'Phone number is required').not().isEmpty(),
    ],
    signup
);

module.exports = router;
