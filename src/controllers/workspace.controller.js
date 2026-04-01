const workspaceService = require("../services/workspace.service");

/**
 * CREATE WORKSPACE
 */
exports.createWorkspace = async (req, res) => {
  try {
    const userId = req.user.id;

    const workspace = await workspaceService.createWorkspace({
      ...req.body,
      userId,
    });

    res.status(201).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create workspace" });
  }
};

/**
 * GET ALL WORKSPACES
 */
exports.getAllWorkspaces = async (req, res) => {
  try {
    const userId = req.user.id;
    const workspaces = await workspaceService.getAllWorkspaces(userId);
    res.status(200).json(workspaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch workspaces" });
  }
};

/**
 * GET ONE
 */
exports.getWorkspaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const workspace = await workspaceService.getWorkspaceById(id, userId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.status(200).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch workspace" });
  }
};

/**
 * UPDATE
 */
exports.updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const updated = await workspaceService.updateWorkspace(
      id,
      userId,
      req.body
    );

    if (!updated) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update workspace" });
  }
};

/**
 * DELETE
 */
exports.deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await workspaceService.deleteWorkspace(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.status(200).json({ message: "Workspace deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete workspace" });
  }
};
