// Função para carregar FATDs e montar os cards
async function carregarFATDs() {
  const res = await fetch("/api/fatds");
  const fatds = await res.json();

  document.querySelectorAll(".coluna").forEach(col => {
    const titulo = col.querySelector("h2").innerText;
    col.innerHTML = `<h2>${titulo}</h2>`;
  });
  
  fatds.forEach(f => {
    const card = document.createElement("div");
    card.className = "card";
    card.draggable = true;
    card.dataset.id = f.id; // id usado no drag
    card.innerHTML = `
      <strong>${f.nome}</strong><br>
      ${f.fato}<br>
      ${f.dataEntrega ? "📅 Entregue: " + f.dataEntrega + "<br>" : ""}
      ${f.dataDevolucao ? "📅 Devolvida: " + f.dataDevolucao + "<br>" : ""}
      ${f.punicao ? "⚖️ Punição: " + f.punicao + "<br>" : ""}
      <button onclick="editarFATD(${f.id})">✏️</button>
      <button onclick="excluirFATD(${f.id})">🗑️</button>
      ${f.status === "publicada" ? `<button onclick="arquivarFATD(${f.id})">📂 Arquivar</button>` : ""}
    `;
    document.getElementById(f.status).appendChild(card);

    // eventos de arrastar
    card.addEventListener("dragstart", dragStart);
  });
}

// Criar FATD
async function criarFATD() {
  const nome = document.getElementById("nome").value;
  const fato = document.getElementById("fato").value;

  if (!nome || !fato) {
    alert("Preencha todos os campos!");
    return;
  }

  await fetch("/api/fatds", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, fato })
  });

  carregarFATDs();
}

// Excluir FATD
async function excluirFATD(id) {
  await fetch(`/api/fatds/${id}`, { method: "DELETE" });
  carregarFATDs();
}

// Editar FATD (simples por enquanto)
async function editarFATD(id) {
  const novoNome = prompt("Novo nome:");
  const novoFato = prompt("Novo fato:");

  await fetch(`/api/fatds/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: novoNome, fato: novoFato })
  });

  carregarFATDs();
}

// Arquivar FATD (mover para publicadas.json)
async function arquivarFATD(id) {
  await fetch(`/api/fatds/${id}/publicar`, { method: "POST" });
  carregarFATDs();
}

// Abrir publicadas
async function abrirPublicadas() {
  const res = await fetch("/api/publicadas");
  const publicadas = await res.json();
  alert("📂 Punições Publicadas:\n" + publicadas.map(p => `${p.nome} - ${p.fato} - ⚖️ ${p.punicao || "Sem punição"}`).join("\n"));
}

/* ========================
   Drag & Drop
======================== */
function dragStart(e) {
  e.dataTransfer.setData("id", e.target.dataset.id);
}

// Configura as colunas como áreas de drop
document.querySelectorAll(".coluna").forEach(coluna => {
  coluna.addEventListener("dragover", e => e.preventDefault());
  coluna.addEventListener("drop", async e => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const novoStatus = coluna.id;

    let extraData = {};

    if (novoStatus === "entregue") {
      const dataEntrega = prompt("Digite a data de entrega (dd/mm/aaaa):");
      if (!dataEntrega) return;
      extraData = { dataEntrega };
    }

    if (novoStatus === "devolvida") {
      const dataDevolucao = prompt("Digite a data de devolução (dd/mm/aaaa):");
      if (!dataDevolucao) return;
      extraData = { dataDevolucao };
    }

    if (novoStatus === "julgada") {
      const punicao = prompt("Digite a punição sofrida:");
      if (!punicao) return;
      extraData = { punicao };
    }

    // Atualiza no servidor o status + dados extras
    await fetch(`/api/fatds/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus, ...extraData })
    });

    carregarFATDs();
  });
});

// Botão para abrir publicadas
function abrirPublicadas() {
  window.location.href = "publicadas.html";
}


carregarFATDs();
