const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = "data.json";

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Servir frontend

// Função para ler dados
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Função para salvar dados
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// [C] Create - Adicionar item
app.post("/api/items", (req, res) => {
  const data = readData();
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  saveData(data);
  res.status(201).json(newItem);
});

// [R] Read - Listar todos os itens
app.get("/api/items", (req, res) => {
  res.json(readData());
});

// [U] Update - Atualizar item
app.put("/api/items/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item não encontrado" });
  }

  data[index] = { ...data[index], ...req.body };
  saveData(data);
  res.json(data[index]);
});

// [D] Delete - Remover item
app.delete("/api/items/:id", (req, res) => {
  let data = readData();
  const id = parseInt(req.params.id);
  const newData = data.filter(item => item.id !== id);

  if (data.length === newData.length) {
    return res.status(404).json({ error: "Item não encontrado" });
  }

  saveData(newData);
  res.json({ message: "Item removido com sucesso" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
