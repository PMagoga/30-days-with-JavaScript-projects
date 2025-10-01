let currentTab = "oficiais";
let diasMes = 30;

async function carregarDados() {
  const res = await fetch("/api/dados");
  return await res.json();
}

async function cadastrarMilitar(nome, escala) {
  const res = await fetch("/api/militares", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, escala })
  });
  return await res.json();
}

async function atualizarEscala(id, dia, escala) {
  const res = await fetch("/api/atualizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, dia, escala })
  });
  return await res.json();
}

async function marcarFinalSemana(dia) {
  const res = await fetch("/api/final-semana", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dia })
  });
  return await res.json();
}

async function alterarDiasMes(dias) {
  const res = await fetch("/api/dias-mes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dias })
  });
  return await res.json();
}

// Gera tabela com histórico nos cabeçalhos
function gerarTabela(militares, escalaFiltro, finaisDeSemana, assignments) {
  let html = `<div class="tabela-bloco"><h3>${escalaFiltro}</h3>`;
  html += "<table><tr><th>Nome</th><th>Folga Semana</th><th>Folga Fds</th><th>Último Dia</th>";
  for (let d = 1; d <= diasMes; d++) {
    let classe = finaisDeSemana.includes(d) ? "fimsemana" : "";
    const assign = assignments.find(a => a.escala === escalaFiltro && a.dia === d);
    const militarNome = assign ? militares.find(m => m.id === assign.id)?.nome : "";
    html += `<th class="${classe}" title="${militarNome || "Livre"}" onclick="toggleFinalSemana(${d})">${d}</th>`;
  }
  html += "</tr>";

  militares
    .filter(m => m.escala === escalaFiltro)
    .forEach(m => {
      html += `<tr>
        <td>${m.nome}</td>
        <td>${m.folgaSemana}</td>
        <td>${m.folgaFds}</td>
        <td>${m.ultimoDia ? m.ultimoDia : "-"}</td>`;

      for (let d = 1; d <= diasMes; d++) {
        const assign = assignments.find(a => a.escala === escalaFiltro && a.dia === d);
        const marcadoParaEste = assign && assign.id === m.id;
        const conteudo = marcadoParaEste ? "X" : "";
        const classeTd = marcadoParaEste ? "x" : "";
        html += `<td class="${classeTd}" onclick="clicar(${m.id}, ${d}, this, '${escalaFiltro}')">${conteudo}</td>`;
      }
      html += "</tr>";
    });

  html += "</table></div>";
  return html;
}

async function abrirAba(tipo) {
  currentTab = tipo;
  const { militares, finaisDeSemana, assignments, diasMes: dias } = await carregarDados();
  diasMes = dias;
  let html = "";

  if (tipo === "oficiais") {
    html = gerarTabela(militares, "oficiais", finaisDeSemana, assignments);
  } else if (tipo === "sargentos") {
    html = gerarTabela(militares, "sargentos-dia", finaisDeSemana, assignments);
    html += gerarTabela(militares, "sargentos-guarda", finaisDeSemana, assignments);
  } else if (tipo === "cabos") {
    html = gerarTabela(militares, "cabo-guarda", finaisDeSemana, assignments);
    html += gerarTabela(militares, "cabo-dia", finaisDeSemana, assignments);
    html += gerarTabela(militares, "motorista", finaisDeSemana, assignments);
    html += gerarTabela(militares, "vila", finaisDeSemana, assignments);
  } else if (tipo === "sd-ev") {
    html = gerarTabela(militares, "sd-ev", finaisDeSemana, assignments);
  }

  document.getElementById("conteudo").innerHTML = html;
}

async function clicar(id, dia, celula, escala) {
  try {
    await atualizarEscala(id, dia, escala);
    abrirAba(currentTab);
  } catch (err) {
    alert("Não foi possível marcar: já existe alguém escalado nesse dia.");
  }
}

async function toggleFinalSemana(dia) {
  await marcarFinalSemana(dia);
  abrirAba(currentTab);
}

// Form cadastrar militar
document.getElementById("formMilitar").addEventListener("submit", async e => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const escala = document.getElementById("escala").value;
  await cadastrarMilitar(nome, escala);
  document.getElementById("formMilitar").reset();
  abrirAba(currentTab);
});

// Alterar dias do mês
document.getElementById("formDiasMes").addEventListener("submit", async e => {
  e.preventDefault();
  const dias = parseInt(document.getElementById("diasMes").value);
  await alterarDiasMes(dias);
  abrirAba(currentTab);
});

// Abrir primeira aba
abrirAba(currentTab);
