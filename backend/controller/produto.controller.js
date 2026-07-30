const Produto = require('../models/Produto')

const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.title || !valores.category || !valores.price || valores.stock === undefined) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes!' })
    }
    try {
        const prod = await Produto.create(valores)
        res.status(201).json(prod)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar produto', err })
        console.error('Erro ao cadastrar produto', err)
        
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Produto.findAll()
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar produtos' })
        console.error('Erro ao listar produtos', err)
    }
}

const buscarPorCod = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Produto.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Produto não encontrado!' })
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produto' })
        console.error('Erro ao buscar produto', err)
    }
}

const buscarPorNome = async (req, res) => {
    const nome = req.params.nome
    try {
        const dados = await Produto.findOne({ where: { title: nome } })
        if (!dados) {
            res.status(404).json({ message: 'Nome do Produto não encontrado!' })
        } else {
            res.status(200).json(dados)
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produto por nome' })
        console.error('Erro ao buscar produto por nome', err)
    }
}

const excluir = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Produto.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Produto não encontrado!' })
        await Produto.destroy({ where: { codProduto: id } })
        res.status(200).json({ message: 'Produto excluído com sucesso!' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir produto' })
        console.error('Erro ao excluir produto', err)
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    try {
        let dados = await Produto.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Produto não encontrado!' })
        await Produto.update(req.body, { where: { codProduto: id } })
        dados = await Produto.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar produto' })
        console.error('Erro ao atualizar produto', err)
    }
}

module.exports = { cadastrar, listar, buscarPorCod, buscarPorNome, excluir, atualizar }