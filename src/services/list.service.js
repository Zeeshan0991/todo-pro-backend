const List = require("../entities/list.entity");

/**
 * Create list under a project
 */
const createList = async ({ title, projectId }) => {
  return await List.create({
    title,
    projectId,
  });
};

/**
 * Get all lists for a project
 */
const getListsByProject = async (projectId) => {
  return await List.findAll({
    where: { projectId },
    order: [["id", "DESC"]],
  });
};

/**
 * Get single list (scoped)
 */
const getListById = async (id, projectId) => {
  return await List.findOne({
    where: { id, projectId },
  });
};

/**
 * Update list
 */
const updateList = async (id, projectId, data) => {
  const list = await getListById(id, projectId);
  if (!list) return null;

  await list.update(data);
  return list;
};

/**
 * Delete list
 */
const deleteList = async (id, projectId) => {
  const list = await getListById(id, projectId);
  if (!list) return null;

  await list.destroy();
  return true;
};

module.exports = {
  createList,
  getListsByProject,
  getListById,
  updateList,
  deleteList,
};
