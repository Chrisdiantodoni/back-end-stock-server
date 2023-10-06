const { DataTypes } = require("sequelize");
const database = require("../../database");

const tukang = database.define(
  "tukang",
  {
    nama_tukang: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    upah: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    no_ktp: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    no_hp: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    alamat: {
      allowNull: true,
      type: DataTypes.STRING,
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
