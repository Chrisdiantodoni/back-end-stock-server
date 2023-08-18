const { DataTypes } = require("sequelize");

const database = require("../../database");

const a1 = database.define(
  "a1",
  {
    part_code: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true,
    },
    large_unit: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    unit_per_pack: {
      type: DataTypes.DOUBLE(18.2),
      allowNull: true,
    },
    unit_per_pack_valid: {
      type: DataTypes.DOUBLE(18.2),
      allowNull: true,
    },
    out_dtl_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

a1.removeAttribute("id");

a1.sync({
  alter: true,
});

module.exports = a1;
