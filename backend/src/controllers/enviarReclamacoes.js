const db = require("../db/app");

const enviarForm = (req, res) => {
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
};
module.exports = {
  enviarForm,
};
