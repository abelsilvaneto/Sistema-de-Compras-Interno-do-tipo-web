document.getElementById('formCompra').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        idUsuario: document.getElementById('idUsuario').value,
        idProduto: document.getElementById('idProduto').value,
        tipoMovimento: document.getElementById('tipoMovimento').value,
        quantidadeMovimentada: document.getElementById('quantidadeMovimentada').value,
        formaPagamento: document.getElementById('formaPagamento').value,
        statusCompra: document.getElementById('statusCompra').value,
        dataCompra: document.getElementById('dataCompra').value
    };

    try {
        const res = await fetch('http://localhost:3000/compra', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        const msgDiv = document.getElementById('msg');

        if (res.ok) {
            msgDiv.style.color = 'lightgreen';
            msgDiv.innerText = 'Movimentação realizada com sucesso!';
            document.getElementById('formCompra').reset();
        } else {
            msgDiv.style.color = 'salmon';
            msgDiv.innerText = data.message;
        }
    } catch (err) {
        console.error('Erro ao registrar operação:', err);
    }
});