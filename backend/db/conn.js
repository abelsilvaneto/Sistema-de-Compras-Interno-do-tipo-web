const { Sequelize } = require('sequelize')

const db = Sequelize('db','root','root',{
    host : 'localhost',
    dialect: 'mysql',
    port: 3306
})


module.exports = db