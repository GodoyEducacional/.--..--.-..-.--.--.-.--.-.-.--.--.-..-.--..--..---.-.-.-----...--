// Importa o módulo express
const express = require("express"); // Importa o framework Express para criar o servidor
// Importa a conexão com o banco de dados
require("./db"); // Executa o arquivo de conexão com o banco de dados MongoDB
// Importa o modelo ToDo
const ToDo = require("./models/ToDo"); // Importa o modelo de tarefas (ToDo)

// Cria uma aplicação express
const app = express(); // Inicializa a aplicação Express

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json()); // Permite que o servidor entenda requisições com corpo em JSON

// Porta do servidor
const PORT = 3000; // Define a porta em que o servidor irá rodar

// Cria uma rota GET para o caminho '/'
app.get("/", (req, res) => {
  // Quando acessar '/', executa a função abaixo
  // Envia a resposta 'Bem-vindo à API' com status 200
  res.status(200).send("Bem-vindo à API"); // Responde com mensagem de boas-vindas
});

// Rota GET para listar todas as tarefas
app.get("/tarefas", async (req, res) => {
  // Quando acessar '/tarefas' com GET
  try {
    const tarefas = await ToDo.find(); // Busca todas as tarefas no banco
    res.json(tarefas); // Retorna as tarefas em formato JSON
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar tarefas" }); // Retorna erro caso aconteça algum problema
  }
});

// Rota GET para buscar uma tarefa específica pelo ID
app.get("/tarefas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tarefa = await ToDo.findById(id);
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar tarefa" });
  }
});

// Rota POST para criar uma nova tarefa
app.post("/tarefas", async (req, res) => {
  // Quando acessar '/tarefas' com POST
  const { descricao } = req.body; // Pega a descrição enviada no corpo da requisição
  if (!descricao) {
    // Se não tiver descrição
    return res.status(400).json({ erro: "Descrição é obrigatória" }); // Retorna erro de requisição
  }
  try {
    const novaTarefa = new ToDo({ descricao }); // Cria uma nova tarefa com a descrição
    await novaTarefa.save(); // Salva a tarefa no banco
    res.status(201).json(novaTarefa); // Retorna a tarefa criada com status 201
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar tarefa" }); // Retorna erro caso aconteça algum problema
  }
});

// Rota PUT para atualizar uma tarefa existente
app.put("/tarefas/:id", async (req, res) => {
  // Quando acessar '/tarefas/:id' com PUT
  const { id } = req.params; // Pega o id da tarefa pela URL
  const { descricao } = req.body; // Pega a nova descrição do corpo da requisição
  if (!descricao) {
    // Se não tiver descrição
    return res.status(400).json({ erro: "Descrição é obrigatória" }); // Retorna erro
  }
  try {
    const tarefa = await ToDo.findByIdAndUpdate(
      id,
      { descricao },
      { new: true }
    ); // Atualiza a tarefa pelo id e retorna a nova versão
    if (!tarefa) {
      // Se não encontrar a tarefa
      return res.status(404).json({ erro: "Tarefa não encontrada" }); // Retorna erro de não encontrado
    }
    res.json(tarefa); // Retorna a tarefa atualizada
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar tarefa" }); // Retorna erro caso aconteça algum problema
  }
});

// Rota DELETE para remover uma tarefa
app.delete("/tarefas/:id", async (req, res) => {
  // Quando acessar '/tarefas/:id' com DELETE
  const { id } = req.params; // Pega o id da tarefa pela URL
  try {
    const tarefa = await ToDo.findByIdAndDelete(id); // Remove a tarefa pelo id
    if (!tarefa) {
      // Se não encontrar a tarefa
      return res.status(404).json({ erro: "Tarefa não encontrada" }); // Retorna erro de não encontrado
    }
    res.status(204).send(); // Retorna status 204 (sem conteúdo) se remover com sucesso
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover tarefa" }); // Retorna erro caso aconteça algum problema
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  // Faz o servidor começar a escutar na porta definida
  console.log(`Servidor de tarefas rodando na porta ${PORT}`); // Mostra mensagem no terminal
});
