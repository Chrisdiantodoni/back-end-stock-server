const { DataTypes } = require("sequelize");
const database = require("../../database");

const gambar = database.define(
  "gambar",
  {
    file_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

gambar.sync({
  alter: false,
});

module.exports = gambar;
