const { DataTypes } = require("sequelize");
const database = require("../../database");
const tukangModel = require("./tukang");

const tukang_time = database.define(
  "tukang_time",
  {
    tukangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    check_in: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_out: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tanggal_masuk: {
      type: DataTypes.DATE,
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
tukangModel.hasMany(tukang_time, {
  foreignKey: "tukangId",
});

tukang_time.belongsTo(tukangModel);

module.exports = tukang_time;
