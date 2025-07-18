// npm init -y e npm install express
// Instalar tudo (Projeto novo) (npm install bcrypt dotenv jsonwebtoken mongoose cors)
// Criar servidor com Nodemon - npm install --save-dev nodemon
// Iniciar npm run start
const express = require("express");
const mongoose = require("mongoose"); // instalar
const bcrypt = require("bcrypt"); // Biblioteca para criptografar senhas
const jwt = require("jsonwebtoken"); // Biblioteca para criar e validar tokens JWT
const dotenv = require("dotenv"); // Biblioteca para carregar variáveis de ambiente a partir de um arquivo .env
//13 Liberar o cors para frontend
const cors = require("cors");

//08 models
const User = require("./models/usuarioModel.js");
//01
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

//01
const app = express(); // Inicializa o aplicativo Express

//03
// Config JSON response
app.use(express.json()); // Configura o Express para aceitar e processar requisições com corpo no formato JSON

//13 Liberar o cors para frontend
app.use(cors());

//02 Rota aberta
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa API!" }); // Rota raiz que retorna uma mensagem de boas-vindas
});

//10 Antes da função
// Rota privada
app.get("/user/:id", async (req, res) => {
  const id = req.params.id; // Obtém o ID do usuário a partir dos parâmetros da URL

  // check if user exists
  const user = await User.findById(id, "-password"); // Busca o usuário no banco de dados, excluindo o campo de senha

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" }); // Retorna um erro 404 se o usuário não for encontrado
  }

  res.status(200).json({ user }); // Retorna os dados do usuário encontrado
});

//12
// Rota privada depois da função criada
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id; // Obtém o ID do usuário a partir dos parâmetros da URL

  // check if user exists
  const user = await User.findById(id, "-password"); // Busca o usuário no banco de dados, excluindo o campo de senha

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" }); // Retorna um erro 404 se o usuário não for encontrado
  }

  res.status(200).json({ user }); // Retorna os dados do usuário encontrado
});

//11 Midllewares (Checagem Token)
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Obtém o cabeçalho de autorização da requisição
  const token = authHeader && authHeader.split(" ")[1]; // Extrai o token JWT do cabeçalho

  if (!token) return res.status(401).json({ msg: "Acesso negado!" }); // Retorna um erro 401 se o token não for fornecido

  try {
    const secret = process.env.SECRET; // Obtém a chave secreta a partir das variáveis de ambiente

    jwt.verify(token, secret); // Verifica se o token é válido

    next(); // Passa o controle para a próxima função/middleware na cadeia de execução
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" }); // Retorna um erro 400 se o token for inválido
  }
}

//07 - Depois criar o arquivo MODEL
app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body; // Obtém os dados do corpo da requisição

  // validations
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" }); // Retorna um erro 422 se o nome não for fornecido
  }

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" }); // Retorna um erro 422 se o email não for fornecido
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" }); // Retorna um erro 422 se a senha não for fornecida
  }

  if (password != confirmpassword) {
    return res
      .status(422)
      .json({ msg: "A senha e a confirmação precisam ser iguais!" }); // Retorna um erro 422 se as senhas não coincidirem
  }

  // check if user exists
  const userExists = await User.findOne({ email: email }); // Verifica se já existe um usuário com o mesmo email

  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" }); // Retorna um erro 422 se o email já estiver em uso
  }

  // create password
  const salt = await bcrypt.genSalt(12); // Gera um salt para criptografar a senha
  const passwordHash = await bcrypt.hash(password, salt); // Cria um hash da senha usando o salt

  // create user
  const newuser = new User({
    name,
    email,
    password: passwordHash, // Salva o hash da senha no banco de dados
  });

  try {
    await newuser.save(); // Salva o novo usuário no banco de dados

    res.status(201).json({ msg: "Usuário criado com sucesso!" }); // Retorna uma mensagem de sucesso
  } catch (error) {
    res.status(500).json({ msg: error }); // Retorna um erro 500 se algo der errado ao salvar o usuário
  }
});

//08
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body; // Obtém os dados do corpo da requisição

  // validations
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" }); // Retorna um erro 422 se o email não for fornecido
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" }); // Retorna um erro 422 se a senha não for fornecida
  }

  // check if user exists
  const user = await User.findOne({ email: email }); // Busca o usuário no banco de dados pelo email

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" }); // Retorna um erro 404 se o usuário não for encontrado
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password); // Compara a senha fornecida com o hash armazenado

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" }); // Retorna um erro 422 se a senha estiver incorreta
  }

  //09 Fazer um env secret para evitar se hackeado
  try {
    const secret = process.env.SECRET; // Obtém a chave secreta a partir das variáveis de ambiente

    const token = jwt.sign(
      {
        id: user._id, // Cria um token JWT contendo o ID do usuário
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token }); // Retorna o token JWT
  } catch (error) {
    res.status(500).json({ msg: error }); // Retorna um erro 500 se algo der errado ao gerar o token
  }

  //Ainda não sabe lidar com token iremos realizar a tratativa no passo 10
});

//05
// Credenciais - Chamando de forma privada
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const port = process.env.PORT || 3000;

//06 Colocar o link de conexão do mongo VsCode no connect e alterar para as variaveis [//GodoyCdc:<db_password>@clusterapi.h93mb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI]
//04
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@clusterapi.h93mb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
    console.log("Conectou ao Banco!");
  })
  .catch((err) => console.log(err));
//06 npm install mongodb

/* ----------------------------------------------------------- */
// localhost:3000
// Usuario localhost/auth/register

// POST // Usuario localhost/auth/register Enviar corpo JSON:
/* 
{
  "nome": "Godoy",
  "email": "gabrielgodoy.santos1998@gmail.com",
  "password": "AbacateAzul",
  "confirmpassword": "AbacateAzul"
}

Carregamento infinito passou, enviou!
*/

// POST // UsuarioLogin localhost/auth/login Enviar corpo JSON:
/* 
{
  "email": "gabrielgodoy.santos1998@gmail.com",
  "password": "AbacateAzul",
}

Carregamento infinito passou, enviou!
*/

// localhost:3000
// Usuario localhost/user/id (ID Criado no mongo)
