const { DataTypes } = require("sequelize");
const database = require("../../database");

const gl_trn_trans = database.define(
  "gl_trn_trans",
  {
    doc_no: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey,
    },
    doc_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    journal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ac_no: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    total: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    c_by: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    c_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    m_by: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    m_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    source_table: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    source_no: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    loc: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    source_trans: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ac_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 0,
    },
    giro_no: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "-",
    },
    kepada: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "-",
    },
    seri_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    description2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    print_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cetak: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
    },
    transfer: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

gl_trn_trans.removeAttribute("id");

gl_trn_trans.sync({
  alter: true,
});

module.exports = gl_trn_trans;
