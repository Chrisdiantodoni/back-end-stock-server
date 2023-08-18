const { DataTypes } = require("sequelize");
const database = require("../../database");
const mst_partModel = require("./mst_part");
const mst_locModel = require("./mst_loc");

const tmp_stock_checking2 = database.define(
  "tmp_stock_checking2",
  {
    part_code: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: mst_partModel, // Referencing the mst_part model
        key: "part_code", // Referencing the primary key of mst_part
      },
    },
    stok: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    w01: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    w02: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    w03: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    w04: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    jual_do: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    loc: {
      type: DataTypes.STRING(10),
      allowNull: true,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    // primaryKey: false,
  }
);

tmp_stock_checking2.sync({
  alter: false,
});

tmp_stock_checking2.hasMany(mst_locModel, {
  foreignKey: "loc", // This should be the foreign key column in mst_locModel
  sourceKey: "loc", // This should be the primary key column in tmp_stock_checking2
  as: "locs",
});
mst_locModel.belongsTo(tmp_stock_checking2, {
  foreignKey: "loc", // This should be the foreign key column in mst_locModel
  targetKey: "loc", // This should be the primary key column in tmp_stock_checking2
  as: "locs",
});

tmp_stock_checking2.hasMany(mst_partModel, {
  foreignKey: "part_code",
  sourceKey: "part_code",
  as: "parts",
});
mst_partModel.belongsTo(tmp_stock_checking2, {
  foreignKey: "part_code", // This should be the foreign key column in mst_partModel
  targetKey: "part_code", // This should be the primary key column in tmp_stock_checking2
  as: "parts",
});

module.exports = tmp_stock_checking2;
