const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Public routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Protected route
router.get("/", authMiddleware, userController.getAllUsers);

module.exports = router;
