const { DataTypes } = require("sequelize");
const database = require("../../database");

const mst_loc = database.define(
  "mst_loc",
  {
    loc: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    owner: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    imonth: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    iyear: {
      type: DataTypes.INTEGER,
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
    out_town: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
    },
    description2: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    idate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

mst_loc.removeAttribute("id");

mst_loc.sync({
  alter: false,
});

module.exports = mst_loc;
