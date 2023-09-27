const { DataTypes } = require("sequelize");
const database = require("../../database");

const tukang_time = database.define(
  "tukang_time",
  {
    tukangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    check_in: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    check_out: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanggal_masuk: {
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
