const {DataTypes} = require("sequelize")

const database = require("../../database");

const a_gl_trans = database.define(
    "a_gl_trans", 
    {
        doc_no  : {
            type : DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            primaryKey
        },
        doc_date  : {
            type : DataTypes.DATE,
            allowNull: true,
        },
        journal_code : {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        description : {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        ac_no : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        total : {
            type: DataTypes.DOUBLE(18.2),
            allowNull: true,
        },
        status : {
            type: DataTypes.STRING(1),
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
        source_table : {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        source_no : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        loc : {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        source_trans : {
            type: DataTypes.STRING(5),
            allowNull: true,
        },
        ac_code : {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        giro_no : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        kepada : {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        seri_id : {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        description2 : {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        print_date : {
            type: DataTypes.DATE,
            allowNull: true,
        },
        cetak : {
            type: DataTypes.INTEGER(3),
            allowNull: true,
        },
        transfer : {
            type: DataTypes.INTEGER(1),
            allowNull: true,
        }

    }, {
        timestamps: false,
        freezeTableName: true
    }

)

a_gl_trans.removeAttribute('id');

a_gl_trans.sync({
    alter: false
})

module.exports = a_gl_trans