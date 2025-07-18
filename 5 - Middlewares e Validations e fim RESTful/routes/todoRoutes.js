const express = require("express");
const todoController = require("../controllers/todoController");
const { todoSchema } = require("../validations/todoValidation");
const validate = require("../middlewares/validate");
const router = express.Router();

// Listar todas as tarefas
router.get("/", todoController.getAll);

// Buscar tarefa por ID
router.get("/:id", todoController.getById);

// Criar nova tarefa (com validação)
router.post("/", validate(todoSchema), todoController.create);

// Atualizar tarefa (com validação)
router.put("/:id", validate(todoSchema), todoController.update);

// Deletar tarefa
router.delete("/:id", todoController.remove);

module.exports = router;
