const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// Rotas
app.use("/api", routes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
