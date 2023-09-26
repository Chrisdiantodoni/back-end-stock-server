const { DataTypes } = require("sequelize");
const database = require("../../database");

const token = database.define(
  "token",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

token.sync({
  alter: false,
  force: false,
});

module.exports = token;
