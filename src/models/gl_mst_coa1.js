const {DataTypes} = require("sequelize")

const database = require("../../database");

const gl_mst_coa1 = database.define(
    "gl_mst_coa1", 
    {
        coa1_code  : {
            type : DataTypes.STRING(10),
            allowNull: false,
            unique: true,
            primaryKey
        },
        description  : {
            type : DataTypes.STRING(50),
            allowNull: true,
        },
        profit_loss  : {
            type : DataTypes.STRING(1),
            allowNull: true,
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
        loc : {
            type : DataTypes.STRING(30),
            allowNull: false,
        },
    }, {
        timestamps: false,
        freezeTableName: true
    }

)

gl_mst_coa1.removeAttribute('id');

gl_mst_coa1.sync({
    alter: false
})

module.exports = gl_mst_coa1