async function carregarCards() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;

    try {
        // Exibe um feedback visual rápido enquanto carrega
        container.innerHTML = '<p>Carregando produtos...</p>';

        const res = await fetch('http://localhost:3000/produtos');
        const produtos = await res.json();

        if (produtos.length === 0) {
            container.innerHTML = '<p>Nenhum produto cadastrado.</p>';
            return;
        }

        // 1. Gera todo o HTML na memória de uma só vez (Performance 10x maior)
        const cardsHTML = produtos.map(p => `
            <div class="card">
                <img src="${p.thumbnail || 'https://via.placeholder.com/150'}" 
                     alt="${p.title}" 
                     loading="lazy" 
                     width="150" 
                     height="150">
                <h3>${p.title}</h3>
                <p><strong>Categoria:</strong> ${p.category}</p>
                <p><strong>Preço:</strong> R$ ${p.price}</p>
                <p><strong>Estoque:</strong> ${p.stock} un</p>
            </div>
        `).join('');

        // 2. Injeta no DOM em uma ÚNICA operação
        container.innerHTML = cardsHTML;

    } catch (err) {
        console.error('Erro ao carregar os cards:', err);
        container.innerHTML = '<p style="color: red;">Erro ao carregar os dados do dashboard.</p>';
    }
}

carregarCards();