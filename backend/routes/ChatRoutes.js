import express from 'express';

const router = express.Router();

router.post('/', chatWithGPT);


export default router;