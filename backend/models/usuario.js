const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuario', {
    codUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(30)
    },
    address: {
        type: DataTypes.STRING(150)
    },
    city: {
        type: DataTypes.STRING(50)
    },
    state: {
        type: DataTypes.STRING(50)
    }
}, {
    timestamps: false,
    tableName: 'usuarios'
})

module.exports = Usuario