const { DataTypes } = require("sequelize");
const database = require("../../database");
const project = require("./project");
const tukang = require("./tukang");

const upah_tukang = database.define(
  "upah_tukang",
  {
    tukangId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    upah: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    projectId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
upah_tukang.sync({
  alter: false,
});

project.hasMany(upah_tukang, {
  foreignKey: "projectId",
});

upah_tukang.belongsTo(project);

tukang.hasMany(upah_tukang, {
  foreignKey: "tukangId",
});

upah_tukang.belongsTo(project);

module.exports = upah_tukang;
