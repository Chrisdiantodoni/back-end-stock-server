const {DataTypes} = require("sequelize")

const database = require("../../database");

const gl_mst_account = database.define(
    "gl_mst_account", 
    {
        ac_code  : {
            type : DataTypes.STRING(10),
            allowNull: false,
            unique: true,
            primaryKey
        },
        description  : {
            type : DataTypes.STRING(100),
            allowNull: true,
        },
        coa4_code  : {
            type : DataTypes.STRING(20),
            allowNull: true,
        },
        coa4_desc  : {
            type : DataTypes.STRING(100),
            allowNull: true,
        },
        coa3_code  : {
            type : DataTypes.STRING(10),
            allowNull: false,
            autoIncrement
        },
        coa2_code  : {
            type : DataTypes.STRING(10),
            allowNull: false,
        },
        coa1_code  : {
            type : DataTypes.STRING(10),
            allowNull: false,
        },
        bbalance  : {
            type : DataTypes.DOUBLE(18.2),
            allowNull: false,
        },
        loc : {
            type : DataTypes.STRING(30),
            allowNull: false,
        },
        c_by : {
            type : DataTypes.STRING(30),
            allowNull: false,
        },
        c_time:{
            type : DataTypes.DATE,
            allowNull: false,
        },
        m_by : {
            type : DataTypes.STRING(30),
            allowNull: false,
        },
        m_time: {
            type : DataTypes.DATE,
            allowNull: false,
        },
        ac_giro_keluar : {
            type : DataTypes.STRING(20),
            allowNull: false,
        },
        ac_giro_masuk : {
            type : DataTypes.STRING(20),
            allowNull: false,
        },
        non_active : {
            type : DataTypes.INTEGER(3),
            allowNull: false,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    }

)

gl_mst_account.removeAttribute('id');

gl_mst_account.sync({
    alter: false
})

module.exports = gl_mst_account