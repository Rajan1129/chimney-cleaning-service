import jwt from 'jsonwebtoken';

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'kitchenking_fallback_secret_key_2026';

  try {
    const decoded = jwt.verify(token, secret);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token' });
  }
}
