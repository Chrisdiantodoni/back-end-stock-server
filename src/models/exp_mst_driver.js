const { DataTypes } = require("sequelize");

const database = require("../../database");

const exp_mst_driver = database.define(
  "exp_mst_driver",
  {
    driver: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      primaryKey,
    },
    description: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    c_by: {
      type: DataTypes.DOUBLE(18.2),
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
    loc: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    flag_driver: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    view_only: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

exp_mst_driver.removeAttribute("id");

exp_mst_driver.sync({
  alter: true,
});

module.exports = exp_mst_driver;
