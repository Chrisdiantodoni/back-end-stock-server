const { DataTypes } = require("sequelize");
const database = require("../../database");

const gl_tmp_neraca_new = database.define(
  "gl_tmp_neraca_new",
  {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ac_code1: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    keterangan1: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nilai1: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: true,
    },
    ac_code2: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    keterangan2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nilai2: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: true,
    },
    user_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

gl_tmp_neraca_new.removeAttribute("id");

gl_tmp_neraca_new.sync({
  alter: true,
});

module.exports = gl_tmp_neraca_new;
