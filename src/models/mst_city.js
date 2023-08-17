const {DataTypes} = require("sequelize")

const database = require("../../database");

const mst_city = database.define(
    "mst_city", 
    {
        city_code  : {
            type : DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        description  : {
            type : DataTypes.STRING(50),
            allowNull: false,
        },
        c_by : {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        c_time : {
            type: DataTypes.DATE,
            allowNull: false
        },
        m_by : {
            type : DataTypes.STRING(30),
            allowNull: false
        },
        m_time : {
            type : DataTypes.DATE,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true
    }

)

mst_city.removeAttribute('id');

mst_city.sync({
    alter: false
})

module.exports = mst_city