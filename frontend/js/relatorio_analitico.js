async function carregarRelatorios() {
    try {
        // --- 1. RELATÓRIO DE PRODUTOS CRÍTICOS ---
        const resC = await fetch('http://localhost:3000/relatorio/produtos-criticos');
        const dataC = await resC.json();
        
        console.log('Resposta da API (Produtos Críticos):', dataC);

        const tbC = document.querySelector('#tblCriticos tbody');
        if (tbC) {
            tbC.innerHTML = '';
            
            if (!Array.isArray(dataC) || dataC.length === 0) {
                tbC.innerHTML = '<tr><td colspan="4" style="color: orange;">Nenhum produto crítico com estoque < 10 encontrado.</td></tr>';
            } else {
                dataC.forEach(p => {
                    // Flexibilidade para diferentes nomes de campos do Sequelize/SQL
                    const codigo = p.codigo_produto || p.codProduto || p.id || '-';
                    const nome = p.nome || p.title || '-';
                    const categoria = p.categoria || p.category || '-';
                    const quantidade = p.quantidade_atual ?? p.stock ?? 0;

                    tbC.innerHTML += `
                        <tr>
                            <td>${codigo}</td>
                            <td>${nome}</td>
                            <td>${categoria}</td>
                            <td>${quantidade}</td>
                        </tr>`;
                });
            }
        }

        // --- 2. RELATÓRIO DE VOLUME FINANCEIRO ---
        const resV = await fetch('http://localhost:3000/relatorio/volume-compras');
        const dataV = await resV.json();
        
        console.log('Resposta da API (Volume de Compras):', dataV);

        const tbV = document.querySelector('#tblVolume tbody');
        if (tbV) {
            tbV.innerHTML = '';

            if (!Array.isArray(dataV) || dataV.length === 0) {
                tbV.innerHTML = '<tr><td colspan="3" style="color: orange;">Nenhuma movimentação/venda registrada para gerar volume.</td></tr>';
            } else {
                dataV.forEach(v => {
                    const nome = v.nome || v.title || '-';
                    const qtd = v.quantidade_total_movimentada || v.total_quantidade || 0;
                    const valor = v.valor_financeiro_movimentado || v.total_valor || 0;

                    tbV.innerHTML += `
                        <tr>
                            <td>${nome}</td>
                            <td>${qtd}</td>
                            <td>R$ ${parseFloat(valor).toFixed(2)}</td>
                        </tr>`;
                });
            }
        }

    } catch (err) {
        console.error('Erro ao carregar relatórios analíticos:', err);
    }
}

// Executa assim que a página carregar
carregarRelatorios();