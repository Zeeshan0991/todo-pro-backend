const Workspace = require("../entities/workspace.entity");

// CREATE
const createWorkspace = async (workspaceData) => {
  const { name, description, userId } = workspaceData;

  const workspace = await Workspace.create({
    name,
    description,
    userId, // 🔥 FOREIGN KEY SET HERE
  });

  return workspace;
};



// GET ALL

 const getAllWorkspaces = async (userId) => {
  return await Workspace.findAll({
    where: { userId },
  });
};



// GET ONE
const getWorkspaceById = async (id, userId) => {
  if (!id || !userId) return null;

  return await Workspace.findOne({
    where: { id, userId },
  });
};





// UPDATE
const updateWorkspace = async (id, userId, data) => {
  const workspace = await Workspace.findOne({
    where: { id, userId },
  });

  if (!workspace) return null;

  await workspace.update(data);
  return workspace;
};



// DELETE
const deleteWorkspace = async (id, userId) => {
  const deleted = await Workspace.destroy({
    where: { id, userId },
  });

  return deleted > 0;
};


module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
};
