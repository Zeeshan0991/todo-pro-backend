const User = require("./user.entity");
const Workspace = require("./workspace.entity");
const Project = require("./project.entity");
const List = require("./list.entity");
const Card = require("./card.entity");

// USER → WORKSPACE
Workspace.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
User.hasMany(Workspace, {
  foreignKey: "userId",
});

// WORKSPACE → PROJECT
Project.belongsTo(Workspace, {
  foreignKey: "workspaceId",
  onDelete: "CASCADE",
});
Workspace.hasMany(Project, {
  foreignKey: "workspaceId",
});

// PROJECT → LIST
List.belongsTo(Project, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
});
Project.hasMany(List, {
  foreignKey: "projectId",
});


// LIST → CARD
Card.belongsTo(List, {
  foreignKey: "listId",
  onDelete: "CASCADE",
});

List.hasMany(Card, {
  foreignKey: "listId",
});


module.exports = { User, Workspace, Project, List, Card };