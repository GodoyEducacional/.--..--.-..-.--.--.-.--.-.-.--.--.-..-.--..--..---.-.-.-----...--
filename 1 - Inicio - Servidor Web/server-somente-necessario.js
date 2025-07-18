// Importa o módulo express
const express = require('express');

// Cria uma aplicação express
const app = express();

// Define a porta em que o servidor vai rodar
const PORT = 3000;

// Cria uma rota GET para o caminho '/'
app.get('/', (req, res) => {
  // Envia a resposta 'Bem-vindo à API' com status 200
  res.status(200).send('Bem-vindo à API');
});

// Inicia o servidor e faz com que ele escute na porta definida
app.listen(PORT, () => {
  // Mostra uma mensagem no console quando o servidor estiver rodando
  console.log(`Servidor rodando na porta ${PORT}`);
});
 