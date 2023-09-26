const db = require("../db/app");

const searchPosition = (req, res) => {
  db.any("SELECT posicao FROM formulario")
    .then((posicoes) => {
      res.json(posicoes);
    })
    .catch((error) => {
      console.error("Erro ao obter posições:", error);
      res.status(500).json({ error: "Erro ao obter posições." });
    });
};
module.exports = {
  searchPosition,
};
