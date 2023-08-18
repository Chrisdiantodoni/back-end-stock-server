const { DataTypes } = require("sequelize");
const database = require("../../database");

const gl_tmp_hpp = database.define(
  "gl_tmp_hpp",
  {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    jual: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    jual_biaya: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    jual_disc: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    jual_retur: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    awal: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    beli: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    beli_biaya: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    beli_retur: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    akhir: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    jual2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    jual_biaya2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    jual_disc2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    jual_retur2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    awal2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    beli2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    beli_biaya2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    beli_retur2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    akhir2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    nilai: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    import: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group1: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    keterangan1: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    keterangan2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    mm: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    mk: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    adj: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    pakai: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    mm2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    mk2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    adj2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    pakai2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    jual_saldo: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    jual_saldo2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    user_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

gl_tmp_hpp.removeAttribute("id");

gl_tmp_hpp.sync({
  alter: true,
});

module.exports = gl_tmp_hpp;
