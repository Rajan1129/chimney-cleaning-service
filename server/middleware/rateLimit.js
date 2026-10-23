import rateLimit from 'express-rate-limit';
export const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false });
export const enquiryLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false, message: { success: false, message: 'Too many enquiries. Please call us directly.' } });
