import express, { json } from "express";
import mysql from "mysql2";
import cors from "cors";
import { mysql_config } from "./utils/mysql_config.js";
import { response } from "./utils/functions.js";

const app = express();
const port = 3000;

app.listen(port, () => console.log(`servidor na porta ${port}!`));

//conexão com o mysql
const connection = mysql.createConnection(mysql_config);

// cors
app.use(cors());

// rotas
app.get("/", (req, res) => {
  res.json(response("success", "API funcionando", 0, null));
});

// endpoints
app.get("/tasks", (req, res) => {
  connection.query("SELECT * FROM tasks", (erro, linhas) => {
    if (!erro) {
      res.json(response("success", "sucesso", linhas.length, linhas));
    } else {
      res.json(response("erro", erro.message, 0, null));
    }
  });
});

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM tasks WHERE id = ?", [id], (erro, linhas) => {
    if (!erro) {
      if (linhas.length > 0) {
        res.json(response("success", "sucesso", linhas.length, linhas));
      } else {
        res.json(response("Aviso", "Tarefa não encontrada", 0, null));
      }
    } else {
      res.json(response("erro", erro.message, 0, null));
    }
  });
});

app.put("/tasks/:id/status/:status", (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  connection.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, id],
    (erro, linhas) => {
      if (!erro) {
        if (linhas.affectedRows > 0) {
          res.json(response("success", "sucesso", linhas.affectedRows, null));
        } else {
          res.json(response("Aviso", "Tarefa não encontrada", 0, null));
        }
      } else {
        res.json(response("erro", erro.message, 0, null));
      }
    }
  );
});

app.use((req, res) => {
  res.json(response("Atenção", "Rota não encontrada", 0, null));
});
