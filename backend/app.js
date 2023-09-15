const pgp = require("pg-promise")();

// Configuração da conexão com o banco de dados PostgreSQL
const db = pgp({
  user: "",
  password: "",
  host: "",
  port: "",
  database: "",
});

module.exports = db;
