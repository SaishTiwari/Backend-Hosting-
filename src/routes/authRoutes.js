const express = require("express");
const { register,login, getAllUsers, deleteUser } = require("../controllers/authController");
const router = express.Router();

// http methods
// GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD

/**
 * @description routes for register
 * @route POST /api/auth/v1/register
 * @method POST
 * @access Public
 * @body { username, email, password }
 * @returns { message, user } on success
 * @returns { error } on failure
 */

router.post("/register", register);

/**
 * @description routes for login
 * @route POST /api/auth/v1/login
 * @method POST
 * @access Public
 * @body { email, password }
 * @returns { message, token, user } on success
 * @returns { error } on failure
 */

router.post("/login", login);

/**
 * @description routes for getting all users
 * @route GET /api/auth/v1/users
 * @method GET
 * @access Public
 * @returns { users } on success
 * @returns { error } on failure
 */
 router.get("/users", getAllUsers);

/**
 * @description routes for deleting a user
 * @route DELETE /api/auth/v1/users/:id
 * @method DELETE
 * @access Public
 * @param { id } user id to delete
 * @returns { message } on success
 * @returns { error } on failure
 */
 router.delete("/user/:userId", deleteUser);

module.exports = router;
