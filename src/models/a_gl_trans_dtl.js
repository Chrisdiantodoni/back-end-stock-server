const {DataTypes} = require("sequelize")

const database = require("../../database");

const a_gl_trans_dtl = database.define(
    "a_gl_trans_dtl", 
    {
        ac_code  : {
            type : DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        description  : {
            type : DataTypes.STRING(100),
            allowNull: true,
        },
        doc_no : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        debit : {
            type: DataTypes.DOUBLE(18.2),
            allowNull: true,
        },
        credit : {
            type: DataTypes.DOUBLE(18.2),
            allowNull: true,
        },
        seq : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status : {
            type: DataTypes.STRING(1),
            allowNull: true,
        },
        trans_dtl_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey
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
        description2 : {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        d : {
            type: DataTypes.SMALLINT(6),
            allowNull: true,
        },
    }, {
        timestamps: false,
        freezeTableName: true
    }

)

a_gl_trans_dtl.removeAttribute('id');

a_gl_trans_dtl.sync({
    alter: true
})

module.exports = a_gl_trans_dtl