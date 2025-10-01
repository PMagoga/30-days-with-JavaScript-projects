const form = document.getElementById("itemForm");
const list = document.getElementById("itemList");

// Função para carregar itens
async function loadItems() {
  const res = await fetch("/api/items");
  const items = await res.json();

  list.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nome} - ${item.idade} anos</span>
      <div>
        <button onclick="editItem(${item.id}, '${item.nome}', ${item.idade})">✏️</button>
        <button onclick="deleteItem(${item.id})">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Adicionar item
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;

  await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, idade })
  });

  form.reset();
  loadItems();
});

// Editar item
async function editItem(id, nome, idade) {
  const novoNome = prompt("Novo nome:", nome);
  const novaIdade = prompt("Nova idade:", idade);

  if (novoNome && novaIdade) {
    await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: novoNome, idade: parseInt(novaIdade) })
    });
    loadItems();
  }
}

// Deletar item
async function deleteItem(id) {
  await fetch(`/api/items/${id}`, { method: "DELETE" });
  loadItems();
}

// Inicializa lista
loadItems();
