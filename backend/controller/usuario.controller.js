const Usuario = require('../models/Usuario')
const { Op } = require('sequelize')

const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.firstName || !valores.lastName || !valores.email || !valores.age) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes!' })
    }
    try {
        const usuario = await Usuario.create(valores)
        res.status(201).json(usuario)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar usuários' })
    }
}

const buscarPorCod = async (req, res) => {
    try {
        const dados = await Usuario.findByPk(req.params.id)
        if (!dados) return res.status(404).json({ message: 'Usuário não encontrado!' })
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário' })
    }
}

const buscarPorNome = async (req, res) => {
    try {
        const dados = await Usuario.findAll({
            where: {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${req.params.nome}%` } },
                    { lastName: { [Op.like]: `%${req.params.nome}%` } }
                ]
            }
        })
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar nome do usuário' })
    }
}

const excluir = async (req, res) => {
    try {
        const dados = await Usuario.findByPk(req.params.id)
        if (!dados) return res.status(404).json({ message: 'Usuário não encontrado!' })
        await Usuario.destroy({ where: { codUsuario: req.params.id } })
        res.status(200).json({ message: 'Usuário excluído com sucesso!' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir usuário' })
    }
}

const atualizar = async (req, res) => {
    try {
        let dados = await Usuario.findByPk(req.params.id)
        if (!dados) return res.status(404).json({ message: 'Usuário não encontrado!' })
        await Usuario.update(req.body, { where: { codUsuario: req.params.id } })
        dados = await Usuario.findByPk(req.params.id)
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar usuário' })
    }
}

module.exports = { cadastrar, listar, buscarPorCod, buscarPorNome, excluir, atualizar }