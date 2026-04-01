const listService = require("../services/list.service");
const { Project, Workspace } = require("../entities");

/**
 * CREATE LIST
 */
exports.createList = async (req, res) => {
  try {
    const { title, projectId } = req.body;
    const userId = req.user.id;

    if (!title || !projectId) {
      return res.status(400).json({
        message: "title and projectId are required",
      });
    }

    // Load project with workspace
    const project = await Project.findOne({
      where: { id: projectId },
      include: { model: Workspace },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Ownership validation
    if (project.Workspace.userId !== userId) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const list = await listService.createList({
      title,
      projectId,
    });

    return res.status(201).json(list);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create list",
    });
  }
};

/**
 * GET ALL LISTS (Project scoped)
 */
exports.getAllLists = async (req, res) => {
  try {
    const { projectId } = req.query;
    const userId = req.user.id;

    if (!projectId) {
      return res.status(400).json({
        message: "projectId is required",
      });
    }

    const project = await Project.findOne({
      where: { id: projectId },
      include: { model: Workspace },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.Workspace.userId !== userId) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const lists = await listService.getListsByProject(projectId);

    return res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch lists" });
  }
};

/**
 * GET SINGLE LIST
 */
exports.getListById = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId } = req.query;
    const userId = req.user.id;

    if (!projectId) {
      return res.status(400).json({
        message: "projectId is required",
      });
    }

    const project = await Project.findOne({
      where: { id: projectId },
      include: { model: Workspace },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.Workspace.userId !== userId) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const list = await listService.getListById(id, projectId);

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    return res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch list" });
  }
};

/**
 * UPDATE LIST
 */
exports.updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId } = req.query;
    const userId = req.user.id;

    if (!projectId) {
      return res.status(400).json({
        message: "projectId is required",
      });
    }

    const project = await Project.findOne({
      where: { id: projectId },
      include: { model: Workspace },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.Workspace.userId !== userId) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const list = await listService.updateList(id, projectId, req.body);

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    return res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update list" });
  }
};

/**
 * DELETE LIST
 */
exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId } = req.query;
    const userId = req.user.id;

    if (!projectId) {
      return res.status(400).json({
        message: "projectId is required",
      });
    }

    const project = await Project.findOne({
      where: { id: projectId },
      include: { model: Workspace },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.Workspace.userId !== userId) {
      return res.status(403).json({
        message: "Unauthorized workspace access",
      });
    }

    const deleted = await listService.deleteList(id, projectId);

    if (!deleted) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    return res.status(200).json({
      message: "List deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete list" });
  }
};
