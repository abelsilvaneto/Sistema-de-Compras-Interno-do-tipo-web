async function listarProdutos() {
    try {
        const res = await fetch('http://localhost:3000/produtos');
        const dados = await res.json();
        const tbody = document.querySelector('#tabelaProdutos tbody');
        tbody.innerHTML = '';
        
        dados.forEach(p => {
            tbody.innerHTML += `
                <tr>
                    <td>${p.codProduto}</td>
                    <td>${p.title}</td>
                    <td>${p.category}</td>
                    <td>R$ ${p.price}</td>
                    <td>${p.stock}</td>
                    <td>
                        <button onclick="excluirProduto(${p.codProduto})" style="background:red;">Excluir</button>
                    </td>
                </tr>`;
        });
    } catch (err) {
        console.error('Erro ao listar produtos:', err);
    }
}

document.getElementById('formProduto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        brand: document.getElementById('brand').value
    };

    try {
        await fetch('http://localhost:3000/produto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        document.getElementById('formProduto').reset();
        listarProdutos();
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err);
    }
});

async function excluirProduto(id) {
    try {
        await fetch(`http://localhost:3000/produto/${id}`, { method: 'DELETE' });
        listarProdutos();
    } catch (err) {
        console.error('Erro ao excluir produto:', err);
    }
}

listarProdutos();