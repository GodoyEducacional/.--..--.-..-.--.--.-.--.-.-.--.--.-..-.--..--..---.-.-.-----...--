// Importa o módulo express
const express = require("express");

// Cria uma aplicação express
const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Porta do servidor
const PORT = 3000;

// Array em memória para armazenar as tarefas
let tarefas = [];
let idAtual = 1;

// Cria uma rota GET para o caminho '/'
app.get("/", (req, res) => {
  // Envia a resposta 'Bem-vindo à API' com status 200
  res.status(200).send("Bem-vindo à API");
});

// Rota GET para listar todas as tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Rota POST para criar uma nova tarefa
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).json({ erro: "Título é obrigatório" });
  }
  const novaTarefa = { id: idAtual++, titulo };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// Rota PUT para atualizar uma tarefa existente com parametro
app.put("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  const tarefa = tarefas.find((t) => t.id === parseInt(id));
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  if (!titulo) {
    return res.status(400).json({ erro: "Título é obrigatório" });
  }
  tarefa.titulo = titulo;
  res.json(tarefa);
});

// Rota DELETE para remover uma tarefa com parametro
app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const index = tarefas.findIndex((t) => t.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  tarefas.splice(index, 1);
  res.status(204).send();
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor de tarefas rodando na porta ${PORT}`);
});
