const Usuario = require('../models/Usuario');

exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId, '-senha');
    if (!usuario) return res.status(404).json({ msg: 'Usuário não encontrado!' });
    res.status(200).json({ usuario });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar usuário.' });
  }
}; 