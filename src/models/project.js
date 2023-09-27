const { DataTypes } = require("sequelize");
const database = require("../../database");

const project = database.define(
  "project",
  {
    nama_project: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lokasi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    stockId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    tukangId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    jobId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    harga: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    end: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM("request", "approve", "reject"),
    },
    approvalId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    gambarId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: true,
      type: DataTypes.ENUM("Harian", "Borongan"),
    },
    beli: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

project.sync({
  alter: false,
});

module.exports = project;
