const { DataTypes } = require("sequelize");
const database = require("../../database");

const user = database.define(
  "user",
  {
    email: {
      allowNull: false,
      type: DataTypes.STRING(60),
      unique: true,
    },
    nama_lengkap: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    reset_password: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    roles: {
      allowNull: true,
      type: DataTypes.ENUM(
        "Accounting",
        "Project Manager",
        "Owner",
        "Finance",
        "Admin",
        "Pembelian",
        "Admin Project"
      ),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

user.sync({
  alter: false,
  force: false,
});

module.exports = user;
