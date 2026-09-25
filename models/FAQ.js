// backend/models/FAQ.js

import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    answer: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
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

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;