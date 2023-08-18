const { DataTypes } = require("sequelize");
const database = require("../../database");
const mst_typeModel = require("./mst_type");

const mst_part = database.define(
  "mst_part",
  {
    part_code: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
    },
    barcode1: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    barcode2: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    barcode3: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    part_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    type_code: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    group_code: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    merk_code: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    sizee: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    small_unit: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    large_unit1: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    unit_per_pack1: {
      type: DataTypes.DOUBLE(6, 2),
      allowNull: true,
    },
    large_unit2: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    unit_per_pack2: {
      type: DataTypes.DOUBLE(6, 2),
      allowNull: true,
    },
    qty_on_hand: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    qty_on_po: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    qty_on_so: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    net_price: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    net_price_last: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    sell_price_min: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    sell_price1: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },

    sell_price2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    sell_price3: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    sell_price4: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    sell_price5: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    sell_price6: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    sell_price_last: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    disc_sp: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    pdisc_sp1: {
      type: DataTypes.DOUBLE(6, 2),
      allowNull: true,
    },
    pdisc_sp2: {
      type: DataTypes.DOUBLE(6, 2),
      allowNull: true,
    },
    pdisc_sp3: {
      type: DataTypes.DOUBLE(6, 2),
      allowNull: true,
    },
    bsell_price_min: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    bsell_price1: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    bsell_price2: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    bsell_price3: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    bsell_price4: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    bsell_price5: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    bsell_price6: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    bsell_price_last: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    bdisc_sp: {
      type: DataTypes.DOUBLE(18, 2),
      allowNull: true,
    },
    bpdisc_sp1: {
      type: DataTypes.DOUBLE(6, 2),
      allowNull: true,
    },
    bpdisc_sp2: {
      type: DataTypes.DOUBLE(6, 2),
      allowNull: true,
    },
    bpdisc_sp3: {
      type: DataTypes.DOUBLE(6, 2),
      allowNull: true,
    },
    nmax: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    nmin: {
      type: DataTypes.DOUBLE(14, 3),
      allowNull: true,
    },
    non_active: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
    },
    ppn: {
      type: DataTypes.INTEGER(3),
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
    unit_trans: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    unit_rpt: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ac_psd: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ac_hpp: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ac_jual: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ac_rjual: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ac_disc_jual: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    kategori: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    foto: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    no_rak: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

mst_part.removeAttribute("id");
mst_part.sync({
  alter: false,
});

// Define associations after the models are fully defined and exported
mst_part.hasMany(mst_typeModel, {
  foreignKey: "type_code",
  as: "types",
});
mst_typeModel.belongsTo(mst_part);

module.exports = mst_part;
