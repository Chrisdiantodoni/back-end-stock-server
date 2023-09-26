const { DataTypes } = require("sequelize");
const database = require("../../database");

const tukang = database.define(
  "tukang",
  {
    nama_tukang: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    no_ktp: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    upah: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

tukang.sync({
  alter: false,
});

module.exports = tukang;
