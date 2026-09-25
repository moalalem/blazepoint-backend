// backend/routes/faq.js

import express from 'express';
import {
  getFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from '../controllers/faqController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getFAQs)
  .post(protect, adminOnly, createFAQ);

router.route('/:id')
  .get(getFAQ)
  .put(protect, adminOnly, updateFAQ)
  .delete(protect, adminOnly, deleteFAQ);

export default router;