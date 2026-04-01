const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const List = sequelize.define(
  "List",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 🔥 FOREIGN KEY
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "lists",
    timestamps: true,
  }
);

module.exports = List;
