// backend/controllers/partnerController.js

import Partner from '../models/Partner.js';

// ============================================
// @desc    Get all partners
// @route   GET /api/partners
// @access  Public
// ============================================
export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find({ isActive: true }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Get single partner
// @route   GET /api/partners/:id
// @access  Public
// ============================================
export const getPartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found',
      });
    }

    res.status(200).json({
      success: true,
      data: partner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Create new partner
// @route   POST /api/partners
// @access  Private (Admin)
// ============================================
export const createPartner = async (req, res) => {
  try {
    const partner = await Partner.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Partner created successfully',
      data: partner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Update partner
// @route   PUT /api/partners/:id
// @access  Private (Admin)
// ============================================
export const updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner updated successfully',
      data: partner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Delete partner
// @route   DELETE /api/partners/:id
// @access  Private (Admin)
// ============================================
export const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};