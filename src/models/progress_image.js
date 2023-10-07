const { DataTypes } = require("sequelize");
const database = require("../../database");

const progress_image = database.define(
  "progress_image",
  {
    file_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

progress_image.sync({
  alter: false,
});

module.exports = progress_image;
