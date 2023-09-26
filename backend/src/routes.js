const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./db/app");
const cors = require("cors");
const position = require("./controllers/buscarPosicoes");
const form = require("./controllers/enviarReclamacoes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

db.connect()
  .then(() => {
    console.log("Conexão com o PostgreSQL estabelecida com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao PostgreSQL:", error);
  });

// Rota para obter a coluna "posicao" de todas as reclamações
app.get("/posicoes", position.searchPosition);

// Rota para enviar reclamações para o banco de dados
app.post("/", form.enviarForm);

app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}`);
});
