const { DataTypes } = require("sequelize");
const database = require("../../database");

const approval_project = database.define(
  "approval_project",
  {
    comments: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    projectId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

approval_project.sync({
  alter: false,
});

module.exports = approval_project;
