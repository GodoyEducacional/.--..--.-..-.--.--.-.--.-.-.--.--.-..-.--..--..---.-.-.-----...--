const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Acesso negado!' });

  try {
    const decodificado = jwt.verify(token, process.env.SECRET);
    req.usuarioId = decodificado.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token inválido!' });
  }
}; 