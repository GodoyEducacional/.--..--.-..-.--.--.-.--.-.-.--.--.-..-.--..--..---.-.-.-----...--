const Joi = require('joi');

const esquemaCadastro = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  confirmacaoSenha: Joi.ref('senha')
});

const esquemaLogin = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().required()
});

module.exports = { esquemaCadastro, esquemaLogin }; 