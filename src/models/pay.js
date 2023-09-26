const { DataTypes } = require("sequelize");
const database = require("../../database");

const pay = database.define(
  "pay",
  {
    tukangId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    nominal: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: true,
      type: DataTypes.ENUM("Sudah, Belum"),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

pay.sync({
  alter: false,
});

module.exports = pay;
