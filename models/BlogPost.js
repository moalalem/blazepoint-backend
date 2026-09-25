// backend/models/BlogPost.js

import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    categoryLabel: {
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    title: {
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    excerpt: {
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    content: {
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    image: {
      type: String,
      default: '',
    },
    author: {
      ar: { type: String, default: 'فريق BlazePoint' },
      en: { type: String, default: 'BlazePoint Team' },
    },
    date: {
      type: Date,
      default: Date.now,
    },
    readTime: {
      ar: { type: String, default: '5 دقائق' },
      en: { type: String, default: '5 min read' },
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;