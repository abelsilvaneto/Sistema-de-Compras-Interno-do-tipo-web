const Usuario = require('./Usuario')
const Produto = require('./Produto')
const Compra = require('./Compra')

Usuario.hasMany(Compra,
    {
        foreignKey: 'idUsuario',
        as: 'comprasUsuario',
        onDelete: 'CASCADE'
    })
Compra.belongsTo(Usuario,
    {
        foreignKey: 'idUsuario',
        as: 'usuarioCompra'
    })

Produto.hasMany(Compra,
    {
        foreignKey: 'idProduto',
        as: 'comprasProduto',
        onDelete: 'CASCADE'
    })
Compra.belongsTo(Produto,
    {
        foreignKey: 'idProduto',
        as: 'produtoCompra'
    })

module.exports = { Usuario, Produto, Compra }
