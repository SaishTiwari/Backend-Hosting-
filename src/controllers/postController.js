const Post = require("../models/postModel");

/**
 * Create a new post
 * @route POST /api/posts/v1
 * @access Private (requires authentication)
 */
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id; // From auth middleware

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const post = new Post({
      title,
      content,
      author,
    });

    await post.save();
    await post.populate("author", "username email");

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/**
 * Get all posts
 * @route GET /api/posts/v1
 * @access Public
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email").sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/**
 * Get a single post by ID
 * @route GET /api/posts/v1/:id
 * @access Public
 */
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", "username email");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/**
 * Update a post
 * @route PUT /api/posts/v1/:id
 * @access Private (only post author)
 */
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the author
    if (post.author.toString() !== userId) {
      return res.status(403).json({ error: "You can only update your own posts" });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    await post.populate("author", "username email");

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/**
 * Delete a post
 * @route DELETE /api/posts/v1/:id
 * @access Private (only post author)
 */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the author
    if (post.author.toString() !== userId) {
      return res.status(403).json({ error: "You can only delete your own posts" });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

