import jwt from 'jsonwebtoken';
import Enquiry from '../models/Enquiry.js';

export async function login(req, res) {
  try {
    const { username, password } = req.body || {};
    const validUser = process.env.ADMIN_USERNAME || 'chimneyservice@tricity';
    const validPass = process.env.ADMIN_PASSWORD || 'ravi@chimney@2020';

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    if (username.trim() !== validUser || password !== validPass) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    const secret = process.env.JWT_SECRET || 'kitchenking_fallback_secret_key_2026';
    const token = jwt.sign(
      { username: validUser, role: 'admin' },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: { username: validUser, role: 'admin' }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
}

export async function me(req, res) {
  return res.json({
    success: true,
    admin: req.admin
  });
}

export async function getStats(req, res) {
  try {
    const total = await Enquiry.countDocuments();
    const newCount = await Enquiry.countDocuments({ status: 'new' });
    const contacted = await Enquiry.countDocuments({ status: 'contacted' });
    const closed = await Enquiry.countDocuments({ status: 'closed' });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const today = await Enquiry.countDocuments({ createdAt: { $gte: startOfToday } });

    const cityStats = await Enquiry.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const serviceStats = await Enquiry.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    return res.json({
      success: true,
      stats: {
        total,
        new: newCount,
        contacted,
        closed,
        today,
        byCity: cityStats.map(c => ({ city: c._id || 'Unknown', count: c.count })),
        byService: serviceStats.map(s => ({ service: s._id || 'General', count: s.count }))
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch statistics', error: err.message });
  }
}

export async function getEnquiries(req, res) {
  try {
    const { status, city, service, search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (city && city !== 'all') {
      filter.city = { $regex: new RegExp(city, 'i') };
    }
    if (service && service !== 'all') {
      filter.service = { $regex: new RegExp(service, 'i') };
    }
    if (search) {
      const q = search.trim();
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
        { message: { $regex: q, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 }).limit(200);
    return res.json({ success: true, count: enquiries.length, enquiries });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch enquiries', error: err.message });
  }
}

export async function updateEnquiry(req, res) {
  try {
    const { id } = req.params;
    const { status, notes, service, city } = req.body;

    const update = {};
    if (status) update.status = status;
    if (notes !== undefined) update.notes = notes;
    if (service) update.service = service;
    if (city) update.city = city;

    const doc = await Enquiry.findByIdAndUpdate(id, update, { new: true });
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    return res.json({ success: true, message: 'Enquiry updated successfully', enquiry: doc });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update enquiry', error: err.message });
  }
}

export async function deleteEnquiry(req, res) {
  try {
    const { id } = req.params;
    const doc = await Enquiry.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    return res.json({ success: true, message: 'Enquiry deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete enquiry', error: err.message });
  }
}
