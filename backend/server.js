import express from 'express';
import dotenv from 'dotenv';

// Importing routes
import ChatRoutes from './routes/ChatRoutes.js';

// Configuration and initialization
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/chat', ChatRoutes);


app.listen(PORT, console.log('Server is running on port 5000'));