// backend/routes/contact.js

import express from 'express';
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public: إنشاء رسالة (من الموقع)
// Private: عرض الرسائل (Admin فقط)
router.route('/')
  .post(createContact)
  .get(protect, adminOnly, getContacts);

router.route('/:id')
  .get(protect, adminOnly, getContact)
  .put(protect, adminOnly, updateContact)
  .delete(protect, adminOnly, deleteContact);

export default router;