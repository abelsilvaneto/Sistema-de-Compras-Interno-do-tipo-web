async function listarUsuarios() {
    try {
        const res = await fetch('http://localhost:3000/usuarios');
        const dados = await res.json();
        const tbody = document.querySelector('#tabelaUsuarios tbody');
        tbody.innerHTML = '';
        
        dados.forEach(u => {
            tbody.innerHTML += `
                <tr>
                    <td>${u.codUsuario}</td>
                    <td>${u.firstName} ${u.lastName}</td>
                    <td>${u.email}</td>
                    <td>${u.city || ''}</td>
                    <td>
                        <button onclick="excluirUsuario(${u.codUsuario})" style="background: red;">Excluir</button>
                    </td>
                </tr>`;
        });
    } catch (err) {
        console.error('Erro ao listar usuários:', err);
    }
}

document.getElementById('formUsuario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
    };

    try {
        await fetch('http://localhost:3000/usuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        document.getElementById('formUsuario').reset();
        listarUsuarios();
    } catch (err) {
        console.error('Erro ao salvar usuário:', err);
    }
});

async function excluirUsuario(id) {
    try {
        await fetch(`http://localhost:3000/usuario/${id}`, { method: 'DELETE' });
        listarUsuarios();
    } catch (err) {
        console.error('Erro ao excluir usuário:', err);
    }
}

listarUsuarios();