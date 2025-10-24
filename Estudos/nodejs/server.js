import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { mysql_config } from "./utils/mysql_config.js";
import { response } from "./utils/functions.js";

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(cors());

const connection = mysql.createConnection(mysql_config);

connection.connect((error) => {
  if (error) {
    console.log("Erro na conexão " + error.stack);
    return;
  }
  console.log("Conexão com sucesso");
});

app.get("/", (req, res) => {
  let result = {
    status: "success",
    message: null,
    data: null,
  };

  connection.query("SELECT * FROM tasks", (erro, resultado) => {
    if (erro) {
      res.json(response("erro", "Erro" + erro.message));
    } else {
      res.json(response("success", "sucesso", resultado));
    }
  });
});
