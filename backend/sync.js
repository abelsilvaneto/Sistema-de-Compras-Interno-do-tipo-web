const sequelize = require('./db/conn'); 
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');
const Compra = require('./models/Compra');

async function inicializarBanco() {
    try {
       
        await sequelize.sync({ force: true });
        console.log(' Tabelas criadas com sucesso!');

        
        await sequelize.query(`
            CREATE OR REPLACE VIEW vw_produtos_criticos AS
            SELECT 
                codProduto AS codigo_produto, 
                title AS nome, 
                category AS categoria, 
                stock AS quantidade_atual
            FROM Produtos
            WHERE stock < 10;
        `);

        
        await sequelize.query(`
            CREATE OR REPLACE VIEW vw_volume_compras AS
            SELECT 
                p.title AS nome,
                SUM(c.quantidadeMovimentada) AS quantidade_total_movimentada,
                SUM(c.quantidadeMovimentada * p.price) AS valor_financeiro_movimentado
            FROM Compras c
            JOIN Produtos p ON c.idProduto = p.codProduto
            WHERE c.tipoMovimento = 'SAIDA'
            GROUP BY p.codProduto, p.title;
        `);

        console.log(' Views criadas com sucesso!');
        

    } catch (error) {
        console.error(' Erro ao sincronizar o banco de dados:', error);
        
    }
}

inicializarBanco();