const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Card = sequelize.define(
  "Card",
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

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // 🔥 FOREIGN KEY
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cards",
    timestamps: true,
  }
);

module.exports = Card;