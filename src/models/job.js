const { DataTypes } = require("sequelize");
const database = require("../../database");

const job = database.define(
  "job",
  {
    projectId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    tukangId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    qty: {
      allowNull: false,
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
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

job.sync({
  alter: false,
});

module.exports = job;
