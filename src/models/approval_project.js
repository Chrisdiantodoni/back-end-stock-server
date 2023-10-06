const { DataTypes } = require("sequelize");
const database = require("../../database");
const project = require("./project");

const approval_project = database.define(
  "approval_project",
  {
    comment: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    projectId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM("request", "approved"),
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

project.hasMany(approval_project, {
  foreignKey: "projectId",
});

approval_project.belongsTo(project);

module.exports = approval_project;
