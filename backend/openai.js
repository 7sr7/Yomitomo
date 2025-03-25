import dotenv from 'dotenv';
import OpenAI from 'openai';

// Set up dotenv and OpenAI API key
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default openai;