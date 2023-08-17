const {DataTypes} = require("sequelize")

const database = require("../../database");

const exp_mst_plat = database.define(
    "exp_mst_plat", 
    {
        plat_no  : {
            type : DataTypes.STRING(10),
            allowNull: false,
            unique: true,
            primaryKey
        },
        description  : {
            type : DataTypes.STRING(20),
            allowNull: true,
        },
        c_by : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        c_time : {
            type: DataTypes.DATE,
            allowNull: true,
        },
        m_by : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        m_time : {
            type: DataTypes.DATE,
            allowNull: true,
        },
        loc : {
            type: DataTypes.STRING(10),
            allowNull: true,
        },

    }, {
        timestamps: false,
        freezeTableName: true
    }

)

exp_mst_plat.removeAttribute('id');

exp_mst_plat.sync({
    alter: false
})

module.exports = exp_mst_plat