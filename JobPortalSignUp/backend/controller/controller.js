const User = require('../models/user');
const { validationResult } = require('express-validator');

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

 
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded. Please upload a PDF resume.' });
    }


    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    }

    
    if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Invalid file type. Only PDF files are allowed.' });
    }

    if (req.file.size > 2 * 1024 * 1024) { // 2MB size limit
        return res.status(400).json({ error: 'File size should not exceed 2 MB' });
    }

    // Extracting data from the request body
    const { name, email, phone, qualification, experience, additionalInfo } = req.body;
    const resumePath = req.file.path; 

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

  
        const newUser = new User({
            name,
            email,
            phone,
            qualification,
            experience,
            additionalInfo,
            resumePath,
        });

        
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

module.exports = {
    signup,
};
