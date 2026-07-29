const Usuario = require('../models/Usuario')
const Produto = require('../models/Produto')

const carregarDadosEmLote = async (req, res) => {
    try {
        const resProd = await fetch('https://dummyjson.com/products')
        const dataProd = await resProd.json()
        const produtosTratados = dataProd.products.map(p => ({
            title: p.title,
            description: p.description,
            category: p.category,
            price: p.price,
            discountPercentage: p.discountPercentage,
            stock: p.stock,
            brand: p.brand || 'Genérica',
            thumbnail: p.thumbnail
        }))

        const resUser = await fetch('https://dummyjson.com/users')
        const dataUser = await resUser.json()
        const usuariosTratados = dataUser.users.map(u => ({
            firstName: u.firstName,
            lastName: u.lastName,
            age: u.age,
            email: u.email,
            phone: u.phone,
            address: u.address ? (typeof u.address === 'object' ? u.address.address : u.address) : '',
            city: u.address ? u.address.city : '',
            state: u.address ? u.address.state : ''
        }))

        await Produto.bulkCreate(produtosTratados, { ignoreDuplicates: true })
        await Usuario.bulkCreate(usuariosTratados, { ignoreDuplicates: true })

        res.status(200).json({ message: 'Carga em lote realizada com sucesso via bulkCreate!' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a carga em lote', error: err.message })
    }
}

module.exports = { carregarDadosEmLote }