const { DataTypes } = require("sequelize");
const database = require("../../database");
const payProjectModel = require("./pay_project");
const job = require("./job");

const pay_detail = database.define(
  "pay_detail",
  {
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    qty: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },

    percentage: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    hasil_akhir: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    nominal: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    payProjectId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    jobId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

pay_detail.sync({
  alter: false,
});

payProjectModel.hasMany(pay_detail, {
  foreignKey: "payProjectId",
});

pay_detail.belongsTo(payProjectModel);

job.hasOne(pay_detail, {
  foreignKey: "jobId",
});

pay_detail.belongsTo(job);

module.exports = pay_detail;
