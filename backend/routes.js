const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./app");
const cors = require("cors");

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
app.get("/", (req, res) => {
  db.any("SELECT posicao FROM formulario")
    .then((posicoes) => {
      res.json(posicoes);
    })
    .catch((error) => {
      console.error("Erro ao obter posições:", error);
      res.status(500).json({ error: "Erro ao obter posições." });
    });
});
// Rota para enviar reclamações para o banco de dados
app.post("/", (req, res) => {
  const { nome, cep, endereco, estado, cidade, bairro, telefone, email, tipo, mensagem, posicao } = req.body;

  db.none("INSERT INTO formulario (nome, cep, endereco, estado, cidade, bairro, telefone, email, tipo, mensagem, posicao) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [
    nome,
    cep,
    endereco,
    estado,
    cidade,
    bairro,
    telefone,
    email,
    tipo,
    mensagem,
    posicao,
  ])
    .then(() => {
      console.log("Dados inseridos com sucesso!");
      res.json({ message: "Dados inseridos com sucesso!" });
    })
    .catch((error) => {
      console.error("Erro ao inserir dados:", error);
      res.status(500).json({ error: "Erro ao inserir dados." });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}`);
});
