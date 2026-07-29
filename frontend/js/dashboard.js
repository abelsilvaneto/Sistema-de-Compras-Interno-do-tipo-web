async function carregarCards() {
    try {
        const res = await fetch('http://localhost:3000/produtos');
        const produtos = await res.json();
        const container = document.getElementById('cardsContainer');
        container.innerHTML = '';
        
        produtos.forEach(p => {
            container.innerHTML += `
                <div class="card">
                    <img src="${p.thumbnail || 'https://via.placeholder.com/150'}" alt="${p.title}">
                    <h3>${p.title}</h3>
                    <p><strong>Categoria:</strong> ${p.category}</p>
                    <p><strong>Preço:</strong> R$ ${p.price}</p>
                    <p><strong>Estoque:</strong> ${p.stock} un</p>
                </div>
            `;
        });
    } catch (err) {
        console.error('Erro ao carregar os cards:', err);
    }
}

carregarCards();