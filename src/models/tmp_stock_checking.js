const { DataTypes } = require("sequelize");
const database = require("../../database");
const mst_partModel = require("./mst_part");
const mst_locModel = require("./mst_loc");

const tmp_stock_checking = database.define(
  "tmp_stock_checking",
  {
    part_code: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    qty: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    wh: {
      type: DataTypes.DOUBLE(14, 3),
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

tmp_stock_checking.sync({
  alter: true,
});

tmp_stock_checking.hasMany(mst_locModel, {
  foreignKey: "loc", // This should be the foreign key column in mst_locModel
  sourceKey: "loc", // This should be the primary key column in tmp_stock_checking2
  as: "locsA",
});
mst_locModel.belongsTo(tmp_stock_checking, {
  foreignKey: "loc", // This should be the foreign key column in mst_locModel
  targetKey: "loc", // This should be the primary key column in tmp_stock_checking2
  as: "locsA",
});

tmp_stock_checking.hasMany(mst_partModel, {
  foreignKey: "part_code",
  sourceKey: "part_code",
  as: "partsA",
});
mst_partModel.belongsTo(tmp_stock_checking, {
  foreignKey: "part_code", // This should be the foreign key column in mst_partModel
  targetKey: "part_code", // This should be the primary key column in tmp_stock_checking2
  as: "partsA",
});
module.exports = tmp_stock_checking;
