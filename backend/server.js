import express from 'express';
import dotenv from 'dotenv';

// Importing routes
import ChatRoutes from './routes/ChatRoutes.js';

// Configuration and initialization
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests

// Routes
app.use('/api/chat', ChatRoutes);

// Starting the server
app.listen(PORT, console.log('Server is running on port 5000'));