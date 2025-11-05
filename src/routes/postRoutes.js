const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { authenticateToken } = require("../middleware/authMiddleware");

/**
 * @description routes for posts
 * @route POST /api/posts/v1
 * @method POST
 * @access Private
 * @body { title, content }
 * @returns { message, post } on success
 */
router.post("/", authenticateToken, createPost);

/**
 * @description routes for getting all posts
 * @route GET /api/posts/v1
 * @method GET
 * @access Public
 * @returns { posts } on success
 */
router.get("/", getAllPosts);

/**
 * @description routes for getting a single post
 * @route GET /api/posts/v1/:id
 * @method GET
 * @access Public
 * @param { id } post id
 * @returns { post } on success
 */
router.get("/:id", getPostById);

/**
 * @description routes for updating a post
 * @route PUT /api/posts/v1/:id
 * @method PUT
 * @access Private
 * @param { id } post id
 * @body { title, content }
 * @returns { message, post } on success
 */
router.put("/:id", authenticateToken, updatePost);

/**
 * @description routes for deleting a post
 * @route DELETE /api/posts/v1/:id
 * @method DELETE
 * @access Private
 * @param { id } post id
 * @returns { message } on success
 */
router.delete("/:id", authenticateToken, deletePost);

module.exports = router;

