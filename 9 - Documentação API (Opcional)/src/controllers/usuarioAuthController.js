const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { esquemaCadastro, esquemaLogin } = require('../validations/usuarioValidacao');

exports.cadastrar = async (req, res) => {
  const { error } = esquemaCadastro.validate(req.body);
  if (error) return res.status(422).json({ msg: error.details[0].message });

  const { nome, email, senha } = req.body;

  const usuarioExiste = await Usuario.findOne({ email });
  if (usuarioExiste) return res.status(422).json({ msg: 'E-mail já cadastrado!' });

  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(senha, salt);

  const usuario = new Usuario({ nome, email, senha: senhaHash });

  try {
    await usuario.save();
    res.status(201).json({ msg: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao cadastrar usuário.' });
  }
};

exports.login = async (req, res) => {
  const { error } = esquemaLogin.validate(req.body);
  if (error) return res.status(422).json({ msg: error.details[0].message });

  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email }).select('+senha');
  if (!usuario) return res.status(404).json({ msg: 'Usuário não encontrado!' });

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return res.status(422).json({ msg: 'Senha inválida!' });

  try {
    const token = jwt.sign({ id: usuario._id }, process.env.SECRET, { expiresIn: '1h' });
    res.status(200).json({ msg: 'Login realizado com sucesso!', token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao gerar token.' });
  }
}; 