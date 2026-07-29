document.getElementById('btnBulk').addEventListener('click', async () => {
    try {
        const resp = await fetch('http://localhost:3000/bulk-create', { method: 'POST' });
        const data = await resp.json();
        document.getElementById('resposta').innerText = data.message;
    } catch (err) {
        document.getElementById('resposta').innerText = 'Erro ao realizar a carga inicial em lote.';
    }
});