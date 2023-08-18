const { DataTypes } = require("sequelize");
const database = require("../../database");

const mst_cust = database.define(
  "mst_cust",
  {
    cust_code: {
      type: DataTypes.STRING(25),
      primaryKey,
      allowNull: false,
    },
    non_active: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    card_no: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    status_cust: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    cust_type: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    cust_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    sent_to: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    region_code: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    city_code: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING(90),
      allowNull: true,
    },
    phone1: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    phone2: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    phone3: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    religi: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    sales_code: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    take_price: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    credit_day: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    plafond: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    ac_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    tax_id1: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    tax_id2: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    tax_name: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    tax_address: {
      type: DataTypes.STRING(180),
      allowNull: true,
    },
    car: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    loc: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    c_by: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    c_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    m_by: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    m_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    giro: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    plafond_temp: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    no_ktp: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    tgl_lahir: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tgl_exp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    kode_grup: {
      type: DataTypes.CHAR(25),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

mst_cust.removeAttribute("id");

mst_cust.sync({
  alter: true,
});

module.exports = mst_cust;
