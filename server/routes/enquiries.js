import { Router } from 'express';
import { createEnquiry } from '../controllers/enquiryController.js';
import { enquiryLimiter } from '../middleware/rateLimit.js';
const r = Router();
r.post('/', enquiryLimiter, createEnquiry);
export default r;
