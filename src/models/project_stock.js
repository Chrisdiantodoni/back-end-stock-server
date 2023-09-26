const { DataTypes } = require("sequelize");
const database = require("../../database");
const supplierModel = require("./supplier");
const stockModel = require("./stock");

const project_stock = database.define(
  "project_stock",
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
    stockId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

project_stock.sync({
  alter: false,
});

supplierModel.hasMany(project_stock, {
  foreignKey: "supplierId",
});

project_stock.belongsTo(supplierModel);

stockModel.hasMany(project_stock, {
  foreignKey: "stockId",
});

module.exports = project_stock;
