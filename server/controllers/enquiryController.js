import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';
import { validateEnquiry } from '../utils/validate.js';
export async function createEnquiry(req, res, next) {
  try {
    if (req.body?.website) return res.status(201).json({ success: true }); // honeypot: silently drop bots
    const { data, errors, ok } = validateEnquiry(req.body);
    if (!ok) return res.status(400).json({ success: false, message: 'Please fix the highlighted fields.', errors });
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ success: false, message: 'Service temporarily unavailable. Please call us instead.' });
    await Enquiry.create(data);
    res.status(201).json({ success: true, message: 'Enquiry received.' });
  } catch (e) { next(e); }
}
