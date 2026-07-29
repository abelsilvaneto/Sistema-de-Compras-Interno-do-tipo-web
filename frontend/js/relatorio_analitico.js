async function carregarRelatorios() {
    try {
        // Tabela Produtos Críticos
        const resC = await fetch('http://localhost:3000/relatorio/produtos-criticos');
        const dataC = await resC.json();
        const tbC = document.querySelector('#tblCriticos tbody');
        tbC.innerHTML = '';
        dataC.forEach(p => {
            tbC.innerHTML += `<tr><td>${p.codigo_produto}</td><td>${p.nome}</td><td>${p.categoria}</td><td>${p.quantidade_atual}</td></tr>`;
        });

        // Tabela Volume de Compras
        const resV = await fetch('http://localhost:3000/relatorio/volume-compras');
        const dataV = await resV.json();
        const tbV = document.querySelector('#tblVolume tbody');
        tbV.innerHTML = '';
        dataV.forEach(v => {
            tbV.innerHTML += `<tr><td>${v.nome}</td><td>${v.quantidade_total_movimentada}</td><td>R$ ${v.valor_financeiro_movimentado}</td></tr>`;
        });
    } catch (err) {
        console.error('Erro ao carregar relatórios analíticos:', err);
    }
}

carregarRelatorios();