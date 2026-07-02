import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';

dotenv.config(); // loads variables from .env file

const app = express();

// Middleware
app.use(cors()); // allows your React frontend to talk to this API
app.use(express.json()); // allows the server to read JSON from requests

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Simple test route - useful to check the server is alive
app.get('/', (req, res) => {
  res.send('Portfolio API is running.');
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
