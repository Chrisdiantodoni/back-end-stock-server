const { DataTypes } = require("sequelize");
const database = require("../../database");

const gl_tmp_buku_besar = database.define(
  "gl_tmp_buku_besar",
  {
    code: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    doc_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    doc_no: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    ac_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    debit: {
      type: DataTypes.DOUBLE(20, 4),
      allowNull: true,
    },
    credit: {
      type: DataTypes.DOUBLE(20, 4),
      allowNull: true,
    },
    bbalance: {
      type: DataTypes.DOUBLE(20, 4),
      allowNull: true,
    },
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    source_trans: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    opposite_ac: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    journal_code: {
      type: DataTypes.STRING(10),
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

gl_tmp_buku_besar.removeAttribute("id");

gl_tmp_buku_besar.sync({
  alter: true,
});

module.exports = gl_tmp_buku_besar;
