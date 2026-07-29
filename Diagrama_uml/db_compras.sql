CREATE DATABASE IF NOT EXISTS `db_compras`;
USE `db_compras`;

-- Tabela de Usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `codUsuario` INT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `age` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30),
  `address` VARCHAR(150),
  `city` VARCHAR(50),
  `state` VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS `produtos` (
  `codProduto` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `category` VARCHAR(50) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `discountPercentage` DECIMAL(5,2) DEFAULT 0.00,
  `stock` INT NOT NULL,
  `brand` VARCHAR(50),
  `thumbnail` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Compras / Movimentacoes
CREATE TABLE IF NOT EXISTS `compras` (
  `idCompra` INT AUTO_INCREMENT PRIMARY KEY,
  `idUsuario` INT NOT NULL,
  `idProduto` INT NOT NULL,
  `tipoMovimento` ENUM('ENTRADA','SAIDA') NOT NULL,
  `quantidadeMovimentada` INT NOT NULL,
  `precoUnitario` DECIMAL(10,2) NOT NULL,
  `descontoAplicado` DECIMAL(5,2) DEFAULT 0.00,
  `precoFinal` DECIMAL(10,2) NOT NULL,
  `formaPagamento` ENUM('DEBITO','CREDITO','DINHEIRO') NOT NULL,
  `statusCompra` ENUM('PAGA','PENDENTE') NOT NULL,
  `dataCompra` DATE NOT NULL,
  FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`codUsuario`) ON DELETE CASCADE,
  FOREIGN KEY (`idProduto`) REFERENCES `produtos`(`codProduto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- View 1: Produtos Criticos (Estoque < 10)
CREATE OR REPLACE VIEW `vw_produtos_criticos` AS
SELECT 
    `codProduto` AS `codigo_produto`,
    `title` AS `nome`,
    `category` AS `categoria`,
    `stock` AS `quantidade_atual`
FROM `produtos`
WHERE `stock` < 10;

-- View 2: Volume Comprado por Produto
CREATE OR REPLACE VIEW `vw_volume_compras` AS
SELECT 
    p.`title` AS `nome`,
    SUM(c.`quantidadeMovimentada`) AS `quantidade_total_movimentada`,
    SUM(c.`quantidadeMovimentada` * c.`precoUnitario`) AS `valor_financeiro_movimentado`
FROM `compras` c
INNER JOIN `produtos` p ON c.`idProduto` = p.`codProduto`
WHERE c.`tipoMovimento` = 'SAIDA'
GROUP BY p.`codProduto`, p.`title`;