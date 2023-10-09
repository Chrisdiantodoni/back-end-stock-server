const { DataTypes } = require("sequelize");
const database = require("../../database");
const pay = require("./pay_project");

const approval_pay = database.define(
  "approval_pay",
  {
    comments: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    payId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM("approve", "reject"),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

approval_pay.sync({
  alter: false,
});

pay.hasMany(approval_pay, {
  foreignKey: "payId",
});

approval_pay.belongsTo(pay);

module.exports = approval_pay;
