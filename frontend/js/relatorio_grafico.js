async function renderizarGraficos() {
    try {
        // Gráfico 1 - Barras Verticais (Estoque Crítico)
        const res1 = await fetch('http://localhost:3000/relatorio/produtos-criticos');
        const data1 = await res1.json();
        
        new Chart(document.getElementById('chart1'), {
            type: 'bar',
            data: {
                labels: data1.map(item => item.nome),
                datasets: [{
                    label: 'Estoque Atual',
                    data: data1.map(item => item.quantidade_atual),
                    backgroundColor: 'rgba(231, 76, 60, 0.7)'
                }]
            }
        });

        // Gráfico 2 - Barras Horizontais (Top 5 Volume Financeiro)
        const res2 = await fetch('http://localhost:3000/relatorio/top5-volume-compras');
        const data2 = await res2.json();
        
        new Chart(document.getElementById('chart2'), {
            type: 'bar',
            data: {
                labels: data2.map(item => item.nome),
                datasets: [{
                    label: 'Volume Financeiro (R$)',
                    data: data2.map(item => item.valor_financeiro_movimentado),
                    backgroundColor: 'rgba(46, 204, 113, 0.7)'
                }]
            },
            options: {
                indexAxis: 'y'
            }
        });
    } catch (err) {
        console.error('Erro ao renderizar gráficos:', err);
    }
}

renderizarGraficos();