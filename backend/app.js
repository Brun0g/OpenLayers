const pgp = require("pg-promise")();

// Configuração da conexão com o banco de dados PostgreSQL
const db = pgp({
  user: "",
  password: "",
  host: "localhost",
  port: "5432",
  database: "prefeitura-sjc",
});

module.exports = db;
