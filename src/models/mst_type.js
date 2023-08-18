const { DataTypes } = require("sequelize");
const database = require("../../database");
const mst_part = require("./mst_part");
// const mst_partModel = require("./mst_part");

const mst_type = database.define(
  "mst_type",
  {
    type_code: {
      type: DataTypes.STRING(15),
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

mst_type.removeAttribute("id");

mst_type.sync({
  alter: false,
});

// Define associations after the models are fully defined and exported

module.exports = mst_type;
