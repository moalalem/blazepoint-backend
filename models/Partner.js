// backend/models/Partner.js

import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Partner name is required'],
      trim: true,
    },
    logo: {
      type: String,
      required: [true, 'Partner logo is required'],
      trim: true,
    },
    color: {
      type: String,
      default: '#6d28d9',
      trim: true,
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

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;