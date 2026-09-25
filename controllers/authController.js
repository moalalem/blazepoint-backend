// backend/controllers/authController.js

import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// ============================================
// إنشاء JWT Token
// ============================================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// ============================================
// @desc    Register a new admin (first time only)
// @route   POST /api/auth/register
// @access  Public (but should be disabled after first admin)
// ============================================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // التحقق من عدم وجود مدير سابق (أول مرة فقط)
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin already exists. Registration is disabled.',
      });
    }

    // التحقق من البريد
    const emailExists = await Admin.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    // إنشاء المدير
    const admin = await Admin.create({
      name,
      email,
      password,
      role: 'superadmin',
    });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
// ============================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // التحقق من المدخلات
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // جلب المدير مع كلمة المرور
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // التحقق من كلمة المرور
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // التحقق من أن الحساب نشط
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is disabled',
      });
    }

    // تحديث آخر تسجيل دخول
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Get current admin
// @route   GET /api/auth/me
// @access  Private
// ============================================
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};