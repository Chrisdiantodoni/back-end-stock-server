const { DataTypes } = require("sequelize");

const database = require("../../database");

const gl_mst_coa2 = database.define(
  "gl_mst_coa2",
  {
    coa2_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      primaryKey,
    },
    description: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    coa1_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    c_by: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    c_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    m_by: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    m_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    loc: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

gl_mst_coa2.removeAttribute("id");

gl_mst_coa2.sync({
  alter: true,
});

module.exports = gl_mst_coa2;
