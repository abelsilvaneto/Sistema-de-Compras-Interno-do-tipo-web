const Produto = require('../models/Produto')
const { Op } = require('sequelize')

const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.title || !valores.category || !valores.price || valores.stock === undefined) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes!' })
    }
    try {
        const prod = await Produto.create(valores)
        res.status(201).json(prod)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar produto' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Produto.findAll()
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar produtos' })
    }
}

const buscarPorCod = async (req, res) => {
    try {
        const dados = await Produto.findByPk(req.params.id)
        if (!dados) return res.status(404).json({ message: 'Produto não encontrado!' })
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produto' })
    }
}

const buscarPorNome = async (req, res) => {
    try {
        const dados = await Produto.findAll({
            where: { title: { [Op.like]: `%${req.params.nome}%` } }
        })
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produto por nome' })
    }
}

const excluir = async (req, res) => {
    try {
        const dados = await Produto.findByPk(req.params.id)
        if (!dados) return res.status(404).json({ message: 'Produto não encontrado!' })
        await Produto.destroy({ where: { codProduto: req.params.id } })
        res.status(200).json({ message: 'Produto excluído com sucesso!' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir produto' })
    }
}

const atualizar = async (req, res) => {
    try {
        let dados = await Produto.findByPk(req.params.id)
        if (!dados) return res.status(404).json({ message: 'Produto não encontrado!' })
        await Produto.update(req.body, { where: { codProduto: req.params.id } })
        dados = await Produto.findByPk(req.params.id)
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar produto' })
    }
}

module.exports = { cadastrar, listar, buscarPorCod, buscarPorNome, excluir, atualizar }