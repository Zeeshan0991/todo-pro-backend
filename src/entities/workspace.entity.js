const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Workspace = sequelize.define(
  "Workspace",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },

    // 🔥 FOREIGN KEY
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "workspaces",
    timestamps: true,
  }
);

module.exports = Workspace;
