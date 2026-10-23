import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import {
  login,
  me,
  getStats,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry
} from '../controllers/adminController.js';

const router = Router();

// Public auth route
router.post('/login', login);

// Protected admin routes
router.use(requireAdmin);
router.get('/me', me);
router.get('/stats', getStats);
router.get('/enquiries', getEnquiries);
router.patch('/enquiries/:id', updateEnquiry);
router.delete('/enquiries/:id', deleteEnquiry);

export default router;
