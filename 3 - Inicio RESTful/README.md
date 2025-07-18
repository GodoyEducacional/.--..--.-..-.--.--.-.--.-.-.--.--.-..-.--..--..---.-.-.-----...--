# API de Tarefas (ToDo) RestFul - Inicio – Node.js, Express e MongoDB

## Visão Geral

Este projeto é uma API RESTful simples para gerenciamento de tarefas (ToDo), desenvolvida para fins didáticos. Ele utiliza Node.js, Express e MongoDB (via Mongoose) e está pronto para ser usado em aulas de introdução a back-end, APIs e bancos de dados NoSQL.

## Esse é somente o inicio do Restful, iremos implementar inicialmente um (MVC)

---

## O que é RESTful?

RESTful é um estilo de arquitetura para APIs que utiliza os métodos HTTP (GET, POST, PUT, DELETE) para manipular recursos de forma padronizada, facilitando a comunicação entre sistemas de maneira simples e escalável.

## O que é MVC?

MVC (Model-View-Controller) é um padrão de arquitetura que separa a aplicação em três camadas:

- **Model**: Responsável pelos dados e regras de negócio (neste projeto, está em `models/ToDo.js`).
- **View**: Responsável pela apresentação (não utilizada neste projeto, pois é apenas back-end).
- **Controller**: Responsável pela lógica de negócio e comunicação entre Model e View (neste projeto, está em `controllers/todoController.js`).

---

## Estrutura do Projeto

```
.
├── config/
│   └── db.js           # Configuração da conexão com o MongoDB
├── controllers/
│   └── todoController.js # Lógica das operações de tarefas
├── models/
│   └── ToDo.js         # Definição do modelo de tarefa
├── routes/
│   └── todoRoutes.js   # Rotas da API de tarefas
├── node_modules/       # Dependências do projeto
├── package.json        # Dependências e scripts do projeto
├── package-lock.json   # Lockfile do npm
├── todo.js             # Arquivo principal do servidor
```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criação de APIs.
- **Mongoose**: ODM para MongoDB.
- **MongoDB**: Banco de dados NoSQL.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **cors**: Middleware para habilitar CORS.
- **express-validator**: (instalado, mas não utilizado no código atual).
- **nodemon**: (devDependency) Reinicia o servidor automaticamente em desenvolvimento.

## Configuração do Banco de Dados

O projeto utiliza o MongoDB Atlas (nuvem). As credenciais de acesso (usuário e senha) devem ser definidas em um arquivo `.env` na raiz do projeto:

```
DB_USER=seu_usuario
DB_PASS=sua_senha
```

O arquivo `config/db.js` faz a conexão com o banco usando essas variáveis.

## Como Executar

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure o arquivo `.env`:**

   - Crie um arquivo `.env` na raiz do projeto com as variáveis `DB_USER` e `DB_PASS`.

3. **Inicie o servidor:**

   - Em modo produção:
     ```bash
     npm start
     ```
   - Em modo desenvolvimento (com reinício automático):
     ```bash
     npm run dev
     ```

4. **Acesse a API:**
   - O servidor estará rodando em `http://localhost:3000/`

## Endpoints da API

### Rota base

- `GET /`
  - Retorna uma mensagem de boas-vindas.

### Rotas de Tarefas (`/tarefas`)

- `GET /tarefas`

  - Lista todas as tarefas cadastradas.

- `GET /tarefas/:id`

  - Busca uma tarefa pelo ID.

- `POST /tarefas`

  - Cria uma nova tarefa.
  - **Body JSON:** `{ "descricao": "Texto da tarefa" }`

- `PUT /tarefas/:id`

  - Atualiza a descrição de uma tarefa existente.
  - **Body JSON:** `{ "descricao": "Nova descrição" }`

- `DELETE /tarefas/:id`
  - Remove uma tarefa pelo ID.

## Estrutura dos Dados

O modelo de tarefa está definido em `models/ToDo.js`:

```js
{
  descricao: String;
}
```

## Explicação dos Principais Arquivos

- **todo.js**: Arquivo principal. Inicializa o Express, configura middlewares, define a porta e importa as rotas de tarefas.
- **config/db.js**: Faz a conexão com o MongoDB usando Mongoose e variáveis de ambiente.
- **models/ToDo.js**: Define o schema da tarefa (apenas campo `descricao`).
- **controllers/todoController.js**: Contém a lógica de cada operação (listar, buscar, criar, atualizar, remover tarefas).
- **routes/todoRoutes.js**: Define as rotas e associa cada uma ao método correspondente do controller.

## Observações Didáticas

- O projeto não possui front-end, focando exclusivamente no back-end e na API, deve ser entendido o que é RESTful.
- Não há autenticação, sendo ideal para introdução ao CRUD e APIs REST.
- O código é simples e direto, facilitando a compreensão para iniciantes.
- O uso de variáveis de ambiente para credenciais é uma boa prática de segurança.
- O projeto pode ser facilmente expandido para incluir validação, autenticação, testes, entre outros...

## Dicas para a Aula

- Teste novamente essa API agora em Restful no postman.
- Solicite para os alunos realizar a atividade que contém na pasta do projeto (`atividade.pdf`).
- Com isso os alunos devem já dominar o CRUD
