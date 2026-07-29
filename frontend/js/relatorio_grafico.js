async function renderizarGraficos() {
    try {
        const res1 = await fetch('http://localhost:3000/relatorio/produtos-criticos');
        const data1 = await res1.json();
        
        console.log('Dados recebidos Gráfico 1:', data1);

        const canvas1 = document.getElementById('chart1');
        if (canvas1 && data1.length > 0) {
            new Chart(canvas1, {
                type: 'bar',
                data: {

                    labels: data1.map(item => item.nome || item.title || `Prod ${item.codigo_produto || item.codProduto}`),
                    datasets: [{
                        label: 'Quantidade em Estoque',
                        data: data1.map(item => item.quantidade_atual ?? item.stock),
                        backgroundColor: 'rgba(231, 76, 60, 0.7)',
                        borderColor: 'rgba(231, 76, 60, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }
            });
        }

       
        const res2 = await fetch('http://localhost:3000/relatorio/top5-volume-compras');
        const data2 = await res2.json();

        console.log('Dados recebidos Gráfico 2:', data2);

        const canvas2 = document.getElementById('chart2');
        if (canvas2 && data2.length > 0) {
            new Chart(canvas2, {
                type: 'bar',
                data: {
                    labels: data2.map(item => item.nome || item.title),
                    datasets: [{
                        label: 'Volume Financeiro (R$)',
                        data: data2.map(item => item.valor_financeiro_movimentado || item.total),
                        backgroundColor: 'rgba(46, 204, 113, 0.7)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y', 
                    responsive: true
                }
            });
        }

    } catch (err) {
        console.error('Erro ao renderizar os gráficos:', err);
    }
}


renderizarGraficos();