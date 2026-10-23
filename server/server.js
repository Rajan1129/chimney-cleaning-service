import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { apiLimiter } from './middleware/rateLimit.js';
import enquiries from './routes/enquiries.js';

import adminRoutes from './routes/admin.js';

const app = express();
app.set('trust proxy', 1); // Render sits behind a proxy
const origins = [process.env.FRONTEND_URL, ...(process.env.ALLOWED_ORIGINS || '').split(',')].map(s => s && s.trim().replace(/\/$/, '')).filter(Boolean);
app.use(helmet());
app.use(cors({
  origin: (o, cb) => (!o || origins.includes(o) ? cb(null, true) : cb(new Error('Not allowed by CORS'))),
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50kb' }));
app.use('/api', apiLimiter);
app.get('/api/health', (req, res) => res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use('/api/enquiries', enquiries);
app.use('/api/admin', adminRoutes);
app.use('/api', (req, res) => res.status(404).json({ success: false, message: 'Not found' }));
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') console.error(err); else console.error(err.message);
  res.status(err.message === 'Not allowed by CORS' ? 403 : 500).json({ success: false, message: 'Something went wrong.' });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API on ${port}`));
connectDB();
