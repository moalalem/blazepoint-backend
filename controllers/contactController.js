// backend/controllers/contactController.js

import Contact from '../models/Contact.js';

// ============================================
// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
// ============================================
export const createContact = async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress || '',
    };

    const contact = await Contact.create(contactData);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact,
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
// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (Admin)
// ============================================
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
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
// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private (Admin)
// ============================================
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
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
// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
// ============================================
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact,
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
// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
// ============================================
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
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