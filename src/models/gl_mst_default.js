const { DataTypes } = require("sequelize");
const database = require("../../database");

const gl_mst_default = database.define(
  "gl_mst_default",
  {
    KODE: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey,
    },
    AC_CODE: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    LOC: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

gl_mst_default.removeAttribute("id");

gl_mst_default.sync({
  alter: true,
});

module.exports = gl_mst_default;
