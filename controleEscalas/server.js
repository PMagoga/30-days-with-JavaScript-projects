const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(express.json());
app.use(express.static("public"));

function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({ militares: [], finaisDeSemana: [], assignments: [], diasMes: 30 }, null, 2)
    );
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Incrementa folgas para todos exceto o escalado
function incrementarFolgas(data, dia, idEscalado) {
  data.militares.forEach(m => {
    if (m.id !== idEscalado) {
      const isFds = data.finaisDeSemana.includes(dia);
      if (isFds) {
        m.folgaFds = (m.folgaFds || 0) + 1;
      } else {
        m.folgaSemana = (m.folgaSemana || 0) + 1;
      }
    }
  });
}

// GET dados
app.get("/api/dados", (req, res) => {
  const data = loadData();
  res.json(data);
});

// Criar militar
app.post("/api/militares", (req, res) => {
  const data = loadData();
  const novo = {
    id: Date.now(),
    nome: req.body.nome,
    escala: req.body.escala,
    folgaSemana: 0,
    folgaFds: 0,
    ultimoDia: null
  };
  data.militares.push(novo);
  saveData(data);
  res.json(novo);
});

// Atualizar escala (marcar/desmarcar)
app.post("/api/atualizar", (req, res) => {
  const { id, dia, escala } = req.body;
  const data = loadData();

  const militar = data.militares.find(m => m.id === id);
  if (!militar) return res.status(404).json({ erro: "Militar não encontrado" });

  // Já existe assignment para este dia/escala?
  const existing = data.assignments.find(a => a.escala === escala && a.dia === dia);

  if (existing && existing.id === id) {
    // Desmarcar
    data.assignments = data.assignments.filter(a => !(a.escala === escala && a.dia === dia));
    saveData(data);
    return res.json({ sucesso: true, desmarcado: true, assignments: data.assignments });
  }

  if (existing && existing.id !== id) {
    // Já tem alguém escalado nesse dia → bloquear
    return res.status(400).json({ erro: "Já existe um militar escalado nesse dia/escala" });
  }

  // Marcar novo assignment
  const isFds = data.finaisDeSemana.includes(dia);
  incrementarFolgas(data, dia, id);
  if (isFds) militar.folgaFds = 0;
  else militar.folgaSemana = 0;
  militar.ultimoDia = dia;

  data.assignments.push({ escala, dia, id });
  saveData(data);
  res.json({ sucesso: true, assignments: data.assignments });
});

// Toggle final de semana
app.post("/api/final-semana", (req, res) => {
  const { dia } = req.body;
  const data = loadData();
  if (data.finaisDeSemana.includes(dia)) {
    data.finaisDeSemana = data.finaisDeSemana.filter(d => d !== dia);
  } else {
    data.finaisDeSemana.push(dia);
  }
  saveData(data);
  res.json({ finaisDeSemana: data.finaisDeSemana });
});

// Alterar número de dias do mês
app.post("/api/dias-mes", (req, res) => {
  const { dias } = req.body;
  const data = loadData();
  data.diasMes = dias;
  saveData(data);
  res.json({ diasMes: data.diasMes });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
