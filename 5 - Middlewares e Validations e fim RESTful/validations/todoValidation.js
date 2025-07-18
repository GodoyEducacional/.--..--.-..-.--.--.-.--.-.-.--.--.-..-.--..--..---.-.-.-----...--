const Joi = require("joi");

const todoSchema = Joi.object({
  descricao: Joi.string().min(3).required().messages({
    'string.base': 'Descrição deve ser um texto',
    'string.empty': 'Descrição é obrigatória',
    'string.min': 'Descrição deve ter pelo menos 3 caracteres',
    'any.required': 'Descrição é obrigatória'
  })
});

module.exports = { todoSchema }; 