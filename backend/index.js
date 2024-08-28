require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const userRoutes = require('./router/router');
const fs = require('fs').promises; // Use fs promises
const path = require('path'); // Import path

// Initialize Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://jayasrirangaramanujamar:jqbI4M5AzL0iCGlH@cluster0.gp9aa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware to parse JSON bodies
app.use(express.json());

// Define static folder to serve uploaded files
const uploadFolderUsers = path.join(__dirname, 'uploads');

// Middleware to check/create "uploads" folder
app.use(async (req, res, next) => {
  try {
    await fs.access(uploadFolderUsers); // Check if folder exists
  } catch (err) {
    if (err.code === 'ENOENT') { // Folder doesn't exist, create it
      try {
        await fs.mkdir(uploadFolderUsers, { recursive: true }); // Create folder recursively
        console.log(`Upload folder created: ${uploadFolderUsers}`);
      } catch (mkdirErr) {
        console.error('Error creating upload folder:', mkdirErr);
        return res.status(500).send('Internal Server Error');
      }
    } else {
      console.error('Error checking upload folder:', err);
      return res.status(500).send('Internal Server Error');
    }
  }
  next(); // Continue request processing
});

// Serve the "uploads" folder as static
app.use('/uploads', express.static(uploadFolderUsers));

// Use userRoutes for /api/users endpoint
app.use('/api/users', userRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
