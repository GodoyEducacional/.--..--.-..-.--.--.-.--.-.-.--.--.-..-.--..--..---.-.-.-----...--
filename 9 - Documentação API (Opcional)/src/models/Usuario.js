const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  senha: { type: String, required: true, select: false },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema); 