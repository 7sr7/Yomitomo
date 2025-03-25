import express from 'express';
import { chatWithGPT } from '../controllers/ChatControllers.js';

const router = express.Router();

router.post('/', chatWithGPT);

export default router;