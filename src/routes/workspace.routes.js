const express = require("express");
const router = express.Router();

const workspaceController = require("../controllers/workspace.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// 🔐 PROTECTED ROUTES
router.post("/", authMiddleware, workspaceController.createWorkspace);
router.get("/", authMiddleware, workspaceController.getAllWorkspaces);
router.get("/:id", authMiddleware, workspaceController.getWorkspaceById);
router.put("/:id", authMiddleware, workspaceController.updateWorkspace);
router.delete("/:id", authMiddleware, workspaceController.deleteWorkspace);

module.exports = router;

