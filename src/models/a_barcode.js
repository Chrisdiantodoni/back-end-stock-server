const { DataTypes } = require("sequelize");

const database = require("../../database");

const a_barcode = database.define(
  "a_barcode",
  {
    KODE_STOCK: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    NAMA_STOCK: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    HARGAJUAL: {
      type: DataTypes.DOUBLE(18.2),
      allowNull: false,
    },
    HARGAJUAL: {
      type: DataTypes.DOUBLE(18.2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

a_barcode.removeAttribute("id");

a_barcode.sync({
  alter: true,
});

module.exports = a_barcode;
