// backend/middleware/auth.js

import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// ============================================
// التحقق من تسجيل الدخول
// ============================================
export const protect = async (req, res, next) => {
  let token;

  // التحقق من الهيدر
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // استخراج التوكن
      token = req.headers.authorization.split(' ')[1];

      // التحقق من التوكن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // جلب المستخدم
      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found',
        });
      }

      next();
    } catch (error) {
      console.error('Auth Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }
};

// ============================================
// التحقق من صلاحية Admin
// ============================================
export const adminOnly = (req, res, next) => {
  if (req.admin && (req.admin.role === 'admin' || req.admin.role === 'superadmin')) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.',
    });
  }
};