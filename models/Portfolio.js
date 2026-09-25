// backend/models/Portfolio.js

import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['solutions', 'apps', 'infrastructure', 'web', 'ecommerce'],
      default: 'solutions',
    },
    categoryLabel: {
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    description: {
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    gradient: {
      type: String,
      default: 'from-indigo-500 to-purple-600',
    },
    icon: {
      type: String,
      default: '💼',
    },
    image: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;