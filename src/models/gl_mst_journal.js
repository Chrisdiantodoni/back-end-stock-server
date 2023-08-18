const { DataTypes } = require("sequelize");
const database = require("../../database");

const gl_mst_journal = database.define(
  "gl_mst_journal",
  {
    journal_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
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

gl_mst_journal.removeAttribute("id");

gl_mst_journal.sync({
  alter: true,
});

module.exports = gl_mst_journal;
