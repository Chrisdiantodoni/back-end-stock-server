const { DataTypes } = require("sequelize");
const database = require("../../database");

const kontrak = database.define(
  "kontrak",
  {
    projectId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    tukangId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    filename: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

kontrak.sync({
  alter: false,
});

module.exports = kontrak;
