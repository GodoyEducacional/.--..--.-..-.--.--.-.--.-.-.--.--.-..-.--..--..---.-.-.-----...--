// Importa o módulo express
const express = require("express");

// Cria uma aplicação express
const app = express();

// Importação das rotas versionadas
const usuariosV1 = require('./routes/v1/usuarios');
const usuariosV2 = require('./routes/v2/usuarios');

app.use('/api/v1/usuarios', usuariosV1);
app.use('/api/v2/usuarios', usuariosV2);

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Rota raiz simples
app.get("/", (req, res) => {
  res.status(200).send("Bem-vindo ao exemplo de versionamento de API");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
