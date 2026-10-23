import mongoose from 'mongoose';
export async function connectDB() {
  if (!process.env.MONGO_URI) { console.error('MONGO_URI missing; enquiries cannot be saved.'); return false; }
  try { await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 }); console.log('MongoDB connected'); return true; }
  catch (e) { console.error('MongoDB connection failed:', e.message); return false; }
}
