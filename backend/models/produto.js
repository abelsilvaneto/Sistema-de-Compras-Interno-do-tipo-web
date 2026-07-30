const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produto', {
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discountPercentage: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'produtos'
})

module.exports = Produto