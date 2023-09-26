const { DataTypes } = require("sequelize");
const database = require("../../database");
const supplierModel = require("../models/supplier");

const stock = database.define(
  "stock",
  {
    nama_barang: {
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
    supplierId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

stock.sync({
  alter: false,
});

supplierModel.hasMany(stock, {
  foreignKey: "supplierId",
});

stock.belongsTo(supplierModel);

module.exports = stock;
