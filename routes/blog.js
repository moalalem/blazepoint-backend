// backend/routes/blog.js

import express from 'express';
import {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/blogController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, adminOnly, createPost);

router.route('/slug/:slug').get(getPostBySlug);

router.route('/:id')
  .put(protect, adminOnly, updatePost)
  .delete(protect, adminOnly, deletePost);

export default router;