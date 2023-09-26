const { DataTypes } = require("sequelize");
const database = require("../../database");

const supplier = database.define(
  "supplier",
  {
    nama_supplier: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    alamat: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    no_hp: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

supplier.sync({
  alter: false,
});

module.exports = supplier;
