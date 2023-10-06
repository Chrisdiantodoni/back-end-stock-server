const { DataTypes } = require("sequelize");
const database = require("../../database");
const project = require("./project");

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
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    qty: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    harga: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    percentage: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    hasil_akhir: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    nominal: {
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
