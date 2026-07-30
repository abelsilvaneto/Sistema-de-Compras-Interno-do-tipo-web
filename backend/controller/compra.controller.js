const { Usuario, Produto, Compra } = require('../models/rel')

const cadastrar = async (req, res) => {
    const v = req.body
    if (!v.idUsuario || !v.idProduto || !v.tipoMovimento || !v.quantidadeMovimentada || !v.formaPagamento || !v.statusCompra || !v.dataCompra) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const produto = await Produto.findByPk(v.idProduto)
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado!' })

        const usuario = await Usuario.findByPk(v.idUsuario)
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado!' })

        let novoEstoque = produto.stock
        if (v.tipoMovimento === 'ENTRADA') {
            novoEstoque += v.quantidadeMovimentada
        } else if (v.tipoMovimento === 'SAIDA') {
            if (produto.stock < v.quantidadeMovimentada) {
                return res.status(400).json({ message: 'Quantidade insuficiente no estoque!' })
            }
            novoEstoque -= v.quantidadeMovimentada
        } else {
            return res.status(400).json({ message: 'Tipo de Movimento Inválido!' })
        }

        const precoUnitario = v.precoUnitario || produto.price
        const desconto = v.descontoAplicado || 0.00
        const precoFinal = (precoUnitario * v.quantidadeMovimentada) * (1 - (desconto / 100))

        await produto.update({ stock: novoEstoque })

        const novaCompra = await Compra.create({
            idUsuario: v.idUsuario,
            idProduto: v.idProduto,
            tipoMovimento: v.tipoMovimento,
            quantidadeMovimentada: v.quantidadeMovimentada,
            precoUnitario: precoUnitario,
            descontoAplicado: desconto,
            precoFinal: precoFinal,
            formaPagamento: v.formaPagamento,
            statusCompra: v.statusCompra,
            dataCompra: v.dataCompra
        })

        res.status(201).json(novaCompra)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar compra/movimentação', err})
        console.error('Erro ao registrar compra/movimentação', err)
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Compra.findAll({ include: ['usuarioCompra', 'produtoCompra'] })
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar movimentações',err })
        console.error('Erro ao listar movimentações', err)
    }
}

module.exports = { cadastrar, listar }