const { DataTypes } = require("sequelize");
const database = require("../../database");

const tukang_time = database.define(
  "tukang_time",
  {
    tukangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sunday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    monday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tuesday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wednesday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thursday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    friday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    saturday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

tukang_time.sync({
  alter: false,
});

module.exports = tukang_time;
