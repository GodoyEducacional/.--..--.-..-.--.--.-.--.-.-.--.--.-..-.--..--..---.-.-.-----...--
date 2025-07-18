# API RESTful de Autenticação de Usuários (Português)

## Visão Geral

Esta API permite o cadastro, login e consulta de perfil de usuários utilizando Node.js, Express, MongoDB (Mongoose), JWT e validação com Joi. O projeto está organizado em uma estrutura RESTful moderna, com todos os nomes, mensagens e rotas em português, ideal para ensino, estudo e produção.

---

## Estrutura do Projeto

```
my-api/
├── src/
│   ├── config/                 # Configuração do banco de dados
│   ├── controllers/            # Lógica dos endpoints (cadastro, login, perfil)
│   ├── routes/                 # Rotas agrupadas por recurso
│   ├── models/                 # Modelos de dados (Usuario)
│   ├── middlewares/            # Middlewares personalizados (autenticacao)
│   ├── validations/            # Validações de entrada (Joi)
│   └── app.js                  # Inicialização do Express
├── .env                        # Variáveis de ambiente (NUNCA subir para o git)
├── .gitignore                  # Ignora node_modules e .env
├── package.json                # Dependências e scripts
└── server.js                   # Inicialização do servidor
```

### O que faz cada parte?
- **src/config/database.js**: Conexão com o MongoDB usando Mongoose.
- **src/models/Usuario.js**: Schema do usuário (nome, email, senha, data de criação).
- **src/validations/usuarioValidacao.js**: Validação dos dados de cadastro e login com Joi.
- **src/controllers/usuarioAuthController.js**: Lógica de cadastro e login.
- **src/controllers/usuarioController.js**: Lógica para buscar o perfil do usuário autenticado.
- **src/middlewares/autenticacao.js**: Middleware para proteger rotas (verifica JWT).
- **src/routes/usuarioAuth.routes.js**: Rotas de autenticação (`/cadastrar`, `/login`).
- **src/routes/usuario.routes.js**: Rota de perfil de usuário (`/perfil`).
- **src/app.js**: Inicializa o Express, middlewares globais e rotas.
- **server.js**: Sobe o servidor na porta correta.

---

## Variáveis de Ambiente (`.env`)

- `DB_USER` e `DB_PASS`: Usuário e senha do MongoDB Atlas.
- `SECRET`: Chave secreta para assinar o JWT.
- `PORT`: Porta do servidor (Render define automaticamente).

Exemplo:
```
DB_USER=seu_usuario
DB_PASS=sua_senha
SECRET=sua_chave_jwt
```

---

## Fluxo de Autenticação

1. **Cadastro:**
   - Usuário envia nome, email, senha e confirmação de senha.
   - Senha é criptografada com bcrypt.
   - Usuário é salvo no banco.
2. **Login:**
   - Usuário envia email e senha.
   - Senha é comparada com o hash salvo.
   - Se válido, retorna um JWT (token de autenticação).
3. **Acesso a rotas protegidas:**
   - Frontend envia o token JWT no header `Authorization`.
   - Middleware valida o token e libera acesso ao recurso.

---

## Rotas da API

### 1. Cadastro de Usuário
- **POST** `/auth/cadastrar`
- **Body:**
  ```json
  {
    "nome": "Seu Nome",
    "email": "seu@email.com",
    "senha": "suaSenha123",
    "confirmacaoSenha": "suaSenha123"
  }
  ```
- **Resposta:**
  - 201: Usuário cadastrado com sucesso
  - 422: Falha de validação ou email já cadastrado

### 2. Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "seu@email.com",
    "senha": "suaSenha123"
  }
  ```
- **Resposta:**
  - 200: `{ "msg": "Login realizado com sucesso!", "token": "<jwt>" }`
  - 404/422: Usuário não encontrado ou senha inválida

### 3. Perfil do Usuário (Protegida)
- **GET** `/usuario/perfil`
- **Headers:**
  - `Authorization: Bearer <token_jwt>`
- **Resposta:**
  - 200: `{ "usuario": { "_id": "...", "nome": "...", "email": "...", ... } }`
  - 401/404: Token inválido ou usuário não encontrado

### 4. Rota aberta de teste
- **GET** `/`
- **Resposta:**
  - 200: `{ "msg": "Bem-vindo à API RESTful de autenticação de usuários!" }`

---

## Exemplos de Uso (Postman ou Frontend)

### Cadastro
- POST `http://localhost:3000/auth/cadastrar`
- Body: JSON (ver acima)

### Login
- POST `http://localhost:3000/auth/login`
- Body: JSON (ver acima)
- **Guarde o token retornado!**

### Perfil do usuário
- GET `http://localhost:3000/usuario/perfil`
- Header:
  - `Authorization: Bearer <token_jwt>`

---