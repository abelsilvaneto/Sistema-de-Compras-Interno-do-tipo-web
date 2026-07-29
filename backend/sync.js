const conn = require('./db/conn')
require('./models/rel')

async function syncDataBase() {
    try {
        await conn.sync({ force: true })
        console.log('Tabelas e relacionamentos criados com sucesso!')

        const queryViewCriticos = `
            CREATE OR REPLACE VIEW vw_produtos_criticos AS
            SELECT 
                codProduto AS codigo_produto,
                title AS nome,
                category AS categoria,
                stock AS quantidade_atual
            FROM produtos
            WHERE stock < 10;
        `
        await conn.query(queryViewCriticos)
        console.log('View vw_produtos_criticos criada!')

        const queryViewVolume = `
            CREATE OR REPLACE VIEW vw_volume_compras AS
            SELECT 
                p.title AS nome,
                SUM(c.quantidadeMovimentada) AS quantidade_total_movimentada,
                SUM(c.quantidadeMovimentada * c.precoUnitario) AS valor_financeiro_movimentado
            FROM compras c
            INNER JOIN produtos p ON c.idProduto = p.codProduto
            WHERE c.tipoMovimento = 'SAIDA'
            GROUP BY p.codProduto, p.title;
        `
        await conn.query(queryViewVolume)
        console.log('View vw_volume_compras criada!')

    } catch (err) {
        console.error('Erro na sincronização:', err)
    } finally {
        await conn.close()
    }
}

syncDataBase()