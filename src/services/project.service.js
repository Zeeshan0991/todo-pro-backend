const Project = require("../entities/project.entity");

/**
 * CREATE PROJECT (workspace scoped)
 */
const createProject = async ({ name, description, workspaceId }) => {
  return await Project.create({
    name,
    description,
    workspaceId,
  });
};

/**
 * GET PROJECTS BY WORKSPACE
 */
const getProjectsByWorkspace = async (workspaceId) => {
  return await Project.findAll({
    where: { workspaceId },
    order: [["id", "DESC"]],
  });
};

/**
 * GET SINGLE PROJECT (scoped)
 */
const getProjectById = async (id, workspaceId) => {
  return await Project.findOne({
    where: { id, workspaceId },
  });
};

/**
 * UPDATE PROJECT
 */
const updateProject = async (id, workspaceId, data) => {
  const project = await getProjectById(id, workspaceId);
  if (!project) return null;

  await project.update(data);
  return project;
};

/**
 * DELETE PROJECT
 */
const deleteProject = async (id, workspaceId) => {
  const project = await getProjectById(id, workspaceId);
  if (!project) return null;

  await project.destroy();
  return true;
};

module.exports = {
  createProject,
  getProjectsByWorkspace,
  getProjectById,
  updateProject,
  deleteProject,
};
