import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  phone: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true, maxlength: 60 },
  service: { type: String, required: true, trim: true, maxlength: 80 },
  message: { type: String, trim: true, maxlength: 1000, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  notes: { type: String, default: '', trim: true, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Enquiry', schema);
