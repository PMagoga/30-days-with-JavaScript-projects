const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const FATDS_FILE = path.join(__dirname, "data", "fatds.json");
const PUBLICADAS_FILE = path.join(__dirname, "data", "publicadas.json");

// Funções auxiliares
function readJSON(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8") || "[]");
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

// 🔹 Listar FATDs
router.get("/fatds", (req, res) => {
  res.json(readJSON(FATDS_FILE));
});

// 🔹 Criar FATD
router.post("/fatds", (req, res) => {
  const fatds = readJSON(FATDS_FILE);
  const newFatd = { id: Date.now(), ...req.body, status: "confeccionada" };
  fatds.push(newFatd);
  writeJSON(FATDS_FILE, fatds);
  res.json(newFatd);
});

// 🔹 Atualizar FATD
router.put("/fatds/:id", (req, res) => {
  const fatds = readJSON(FATDS_FILE);
  const index = fatds.findIndex(f => f.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Não encontrada" });

  fatds[index] = { ...fatds[index], ...req.body };
  writeJSON(FATDS_FILE, fatds);
  res.json(fatds[index]);
});

// 🔹 Deletar FATD
router.delete("/fatds/:id", (req, res) => {
  let fatds = readJSON(FATDS_FILE);
  fatds = fatds.filter(f => f.id != req.params.id);
  writeJSON(FATDS_FILE, fatds);
  res.json({ success: true });
});

// 🔹 Mover para publicadas
router.post("/fatds/:id/publicar", (req, res) => {
  let fatds = readJSON(FATDS_FILE);
  let publicadas = readJSON(PUBLICADAS_FILE);

  const index = fatds.findIndex(f => f.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Não encontrada" });

  const publicada = fatds[index];
  fatds.splice(index, 1);

  publicadas.push(publicada);
  writeJSON(FATDS_FILE, fatds);
  writeJSON(PUBLICADAS_FILE, publicadas);

  res.json(publicada);
});

// 🔹 Listar publicadas
router.get("/publicadas", (req, res) => {
  res.json(readJSON(PUBLICADAS_FILE));
});

module.exports = router;
