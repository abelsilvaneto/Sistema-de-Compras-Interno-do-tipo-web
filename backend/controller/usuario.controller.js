const Usuario = require('../models/Usuario')


const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.firstName || !valores.lastName || !valores.email || !valores.age) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes!' })
    }
    try {
        const usuario = await Usuario.create(valores)
        res.status(201).json(usuario)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', err })
        console.error('Erro ao cadastrar usuário', err)
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar usuários' })
        console.error('Erro ao listar usuários', err)
    }
}

const buscarPorCod = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Usuario.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Usuário não encontrado!' })
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário' })
        console.error('Erro ao buscar usuário', err)
    }
}

const buscarPorNome = async (req, res) => {
    const nome = req.params.nome
    try {
      const dados = await Usuario.findOne({where : { firstName : nome}})
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar nome do usuário' })
        console.error('Erro ao buscar nome do usuário', err)
    }
}

const excluir = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Usuario.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Usuário não encontrado!' })
        await Usuario.destroy({ where: { codUsuario: id } })
        res.status(200).json({ message: 'Usuário excluído com sucesso!' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir usuário' })
        console.error('Erro ao excluir usuário', err)
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id
    try {
        let dados = await Usuario.findByPk(id)
        if (!dados) return res.status(404).json({ message: 'Usuário não encontrado!' })
        await Usuario.update(valores, { where: { codUsuario: id } })
        dados = await Usuario.findByPk(id)
        res.status(200).json(dados)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar usuário' })
        console.error('Erro ao atualizar usuário', err)
    }
}

module.exports = { cadastrar, listar, buscarPorCod, buscarPorNome, excluir, atualizar }