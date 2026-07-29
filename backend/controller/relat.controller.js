const VwProdutosCriticos = require('../models/VwProdutosCriticos')
const VwVolumeCompras = require('../models/VwVolumeCompras')

const listarProdutosCriticos = async (req, res) => {
    try {
        const dados = await VwProdutosCriticos.findAll()
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar relatório de produtos críticos' })
    }
}

const listarVolumeCompras = async (req, res) => {
    try {
        const dados = await VwVolumeCompras.findAll()
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar relatório de volume de compras' })
    }
}

const listarTop5VolumeCompras = async (req, res) => {
    try {
        const dados = await VwVolumeCompras.findAll({
            order: [['valor_financeiro_movimentado', 'DESC']],
            limit: 5
        })
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar top 5 volume de compras' })
    }
}

module.exports = { listarProdutosCriticos, listarVolumeCompras, listarTop5VolumeCompras }