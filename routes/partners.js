// backend/routes/partners.js

import express from 'express';
import {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner,
} from '../controllers/partnerController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPartners)
  .post(protect, adminOnly, createPartner);

router.route('/:id')
  .get(getPartner)
  .put(protect, adminOnly, updatePartner)
  .delete(protect, adminOnly, deletePartner);

export default router;