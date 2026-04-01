const projectService = require("../services/project.service");
const { Workspace } = require("../entities");

/**
 * CREATE PROJECT
 */
exports.createProject = async (req, res) => {
  try {
    const { name, description, workspaceId } = req.body;
    const userId = req.user.id;

    if (!name || !workspaceId) {
      return res.status(400).json({
        message: "name and workspaceId are required",
      });
    }

    // 🔒 Verify workspace ownership
    const workspace = await Workspace.findOne({
      where: { id: workspaceId, userId },
    });

    if (!workspace) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const project = await projectService.createProject({
      name,
      description,
      workspaceId,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create project",
    });
  }
};

/**
 * GET ALL PROJECTS (workspace scoped)
 */
exports.getAllProjects = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    const userId = req.user.id;

    if (!workspaceId) {
      return res.status(400).json({
        message: "workspaceId is required",
      });
    }

    const workspace = await Workspace.findOne({
      where: { id: workspaceId, userId },
    });

    if (!workspace) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const projects = await projectService.getProjectsByWorkspace(workspaceId);
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

/**
 * GET SINGLE PROJECT
 */
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { workspaceId } = req.query;
    const userId = req.user.id;

    if (!workspaceId) {
      return res.status(400).json({
        message: "workspaceId is required",
      });
    }

    const workspace = await Workspace.findOne({
      where: { id: workspaceId, userId },
    });

    if (!workspace) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const project = await projectService.getProjectById(id, workspaceId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch project",
    });
  }
};

/**
 * UPDATE PROJECT
 */
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { workspaceId } = req.query;
    const userId = req.user.id;

    if (!workspaceId) {
      return res.status(400).json({
        message: "workspaceId is required",
      });
    }

    const workspace = await Workspace.findOne({
      where: { id: workspaceId, userId },
    });

    if (!workspace) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const project = await projectService.updateProject(
      id,
      workspaceId,
      req.body
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

/**
 * DELETE PROJECT
 */
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { workspaceId } = req.query;
    const userId = req.user.id;

    if (!workspaceId) {
      return res.status(400).json({
        message: "workspaceId is required",
      });
    }

    const workspace = await Workspace.findOne({
      where: { id: workspaceId, userId },
    });

    if (!workspace) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const deleted = await projectService.deleteProject(id, workspaceId);

    if (!deleted) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};
