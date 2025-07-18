// Importa a biblioteca mongoose, que permite interagir com o MongoDB
const mongoose = require("mongoose");

// Cria um "schema" (molde/estrutura) para os documentos da coleção ToDo
const ToDoSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
});

// Exporta um modelo baseado no schema acima
// Esse modelo será usado para criar, ler, atualizar e deletar tarefas no banco
module.exports = mongoose.model("ToDo", ToDoSchema);
