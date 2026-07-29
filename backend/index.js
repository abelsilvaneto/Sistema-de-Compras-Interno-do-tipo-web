const express = require('express')
const cors = require('cors')
const conn = require('./db/conn')
const app = express()

const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
const compraController = require('./controller/compra.controller')
const relatVwController = require('./controller/relatVW.controller')
const bulkController = require('./controller/bulk.controller')

const HOST = 'localhost'
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.post('/bulk-create', bulkController.carregarDadosEmLote)


app.post('/usuario', usuarioController.cadastrar)
app.get('/usuarios', usuarioController.listar)
app.get('/usuario/:id', usuarioController.buscarPorCod)
app.get('/usuario/buscar/:nome', usuarioController.buscarPorNome)
app.delete('/usuario/:id', usuarioController.excluir)
app.put('/usuario/:id', usuarioController.atualizar)


app.post('/produto', produtoController.cadastrar)
app.get('/produtos', produtoController.listar)
app.get('/produto/:id', produtoController.buscarPorCod)
app.get('/produto/buscar/:nome', produtoController.buscarPorNome)
app.delete('/produto/:id', produtoController.excluir)
app.put('/produto/:id', produtoController.atualizar)


app.post('/compra', compraController.cadastrar)
app.get('/compras', compraController.listar)


app.get('/relatorio/produtos-criticos', relatVwController.listarProdutosCriticos)
app.get('/relatorio/volume-compras', relatVwController.listarVolumeCompras)
app.get('/relatorio/top5-volume-compras', relatVwController.listarTop5VolumeCompras)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API do Sistema de Compras Interno ativa!' })
})

conn.sync().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Servidor rodando em http://${HOST}:${PORT}`)
    })
}).catch(err => console.error('Erro na conexão com BD:', err))