const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');

const usuarioAuthRoutes = require('./routes/usuarioAuth.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

app.use('/auth', usuarioAuthRoutes);
app.use('/usuario', usuarioRoutes);

app.get('/', (req, res) => {
  res.json({ msg: 'Bem-vindo à API RESTful de autenticação de usuários!' });
});

module.exports = app; 