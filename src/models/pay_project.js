const { DataTypes } = require("sequelize");
const database = require("../../database");

const payProject = database.define(
  "payProject",
  {
    tukangId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    projectId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: true,
      type: DataTypes.ENUM("Sudah", "Belum"),
    },
    approvalType: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    imageId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

payProject.sync({
  alter: false,
});

module.exports = payProject;
