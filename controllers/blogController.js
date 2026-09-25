// backend/controllers/blogController.js

import BlogPost from '../models/BlogPost.js';

// GET all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ isPublished: true }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// GET single post by slug
export const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// CREATE
export const createPost = async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message,
    });
  }
};

// UPDATE
export const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message,
    });
  }
};

// DELETE
export const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
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