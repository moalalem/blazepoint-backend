// backend/server.js

// ============================================
// 1. تحميل المتغيرات البيئية (يجب أن يكون أول شيء)
// ============================================
import dotenv from 'dotenv';
dotenv.config();

// ============================================
// 2. الاستيرادات
// ============================================
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import partnerRoutes from './routes/partners.js';
import portfolioRoutes from './routes/portfolio.js';
import blogRoutes from './routes/blog.js';
import faqRoutes from './routes/faq.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';

// ============================================
// 3. الاتصال بقاعدة البيانات
// ============================================
connectDB();

// ============================================
// 4. تهيئة السيرفر
// ============================================
const app = express();

// ============================================
// 5. Middlewares
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ============================================
// 6. Routes
// ============================================

// المسار الأساسي
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 BlazePoint API is running...',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// Public APIs
// ============================================
app.use('/api/partners', partnerRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/contact', contactRoutes);

// ============================================
// Auth API
// ============================================
app.use('/api/auth', authRoutes);

// ============================================
// 7. 404 - Route not found
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ============================================
// 8. تشغيل السيرفر
// ============================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});