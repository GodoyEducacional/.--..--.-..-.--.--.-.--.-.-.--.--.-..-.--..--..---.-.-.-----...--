# Projeto Servidor Express Simples — Aula Prática

Este projeto inicial para fins didáticos, com o objetivo de ensinar como iniciar um projeto Node.js, instalar o Express, criar um servidor básico e demonstrar o uso dos métodos HTTP (GET, POST, PUT, DELETE) e testar usando o Postman ou Insomnia.

# Package.json tem todas as bibliotecas/libs utilizadas no projeto, ela cria a pasta node_modules, quando já existir pelo comando "npm install"

# Essa pasta não sobe para o github.

---

## O que é um Servidor Web?

Um **servidor web** é um programa que recebe requisições (pedidos) de clientes (normalmente navegadores ou ferramentas como Postman) através da internet ou rede local, processa essas requisições e devolve uma resposta. No contexto do Node.js, usamos o Express para facilitar a criação desse servidor.

- Exemplo: Quando você acessa um site, seu navegador faz uma requisição para o servidor web daquele site, que responde com o conteúdo da página.

## O que são Rotas?

**Rotas** são os caminhos/endpoints que o servidor web reconhece e responde. Cada rota está associada a um método HTTP (GET, POST, PUT, DELETE, etc.) e a uma função que define o que acontece quando aquela rota é acessada.

- Exemplo: Uma rota GET `/tarefas` retorna a lista de tarefas. Uma rota POST `/tarefas` adiciona uma nova tarefa.
- As rotas permitem organizar e controlar o que o servidor faz para cada tipo de requisição.

---

## 1. Pré-requisitos

- **Node.js** instalado na máquina (https://nodejs.org/)
- **A instalação é feita para ter comandos npm**
- **npm** (gerenciador de pacotes do Node, já vem junto)

## 2. Como iniciar o projeto, já feito

2. Abra o terminal na pasta do projeto.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Se a pasta já existir somente executar:
   ```bash
   npm run dev ou npm start
   ```

## 3. Node.js e Instalando o Express

Iniciar o projeto criar o arquivo server.js ou app.js e executar:

```bash
npm init -y
```

Depois instalar o Framework Express:

```bash
npm install express
```

## 3.1 Instalar o nodemon e editar o arquivo package.json:

```bash
npm install nodemon --save-dev
```

1. Adicionar no package.json: "dev": "nodemon server.js"

## 4. Estrutura básica do servidor

O arquivo principal é o `server.js`, que contém um servidor Express simples:

```js
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Bem-vindo à API");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

## 5. Rodando o servidor

- Para rodar normalmente:

  ```bash
  npm start
  ```

  ou

  ```bash
  node server.js
  ```

- Para rodar com reinício automático ao salvar (usando nodemon):
  ```bash
  npm run dev
  ```
  (O nodemon reinicia o servidor sempre que você salva o arquivo)

## 6. Criando um servidor de tarefas (to-do list)

Criar um arquivo chamado `todo.js` com um CRUD básico de tarefas, usando métodos HTTP, ainda sem bancos de dados a ideia é compreender requisições http e a familia de respostas (https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status):

```js
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3001;
let tarefas = [];
let idAtual = 1;

// Listar tarefas
app.get("/tarefas", (req, res) => res.json(tarefas));

// Criar tarefa
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: "Título é obrigatório" });
  const novaTarefa = { id: idAtual++, titulo };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// Atualizar tarefa
app.put("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  const tarefa = tarefas.find((t) => t.id === parseInt(id));
  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
  if (!titulo) return res.status(400).json({ erro: "Título é obrigatório" });
  tarefa.titulo = titulo;
  res.json(tarefa);
});

// Remover tarefa
app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const index = tarefas.findIndex((t) => t.id === parseInt(id));
  if (index === -1)
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  tarefas.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () =>
  console.log(`Servidor de tarefas rodando na porta ${PORT}`)
);
```

## 7. Testando com o Postman

1. **GET** `http://localhost:3001/tarefas` — Lista todas as tarefas
2. **POST** `http://localhost:3001/tarefas` — Cria uma tarefa
   - Body (JSON): `{ "titulo": "Estudar Node" }`
3. **PUT** `http://localhost:3001/tarefas/1` — Atualiza a tarefa de id 1
   - Body (JSON): `{ "titulo": "Estudar Express" }`
4. **DELETE** `http://localhost:3001/tarefas/1` — Remove a tarefa de id 1

## 7.1 Lembrete

1. Qualquer alteração, se rodou com npm start é necessário parar e reiniciar, por isso deve usar o nodemon "npm run dev"

## 8. Dicas:

- Mostre como editar o código e salvar para ver o nodemon reiniciar automaticamente.
- Explique a diferença entre cada método HTTP.
- Mostre como ver o status da resposta no Postman ou no navegador (aba Network > Status Code).
- Deixe os alunos criarem novas rotas e testarem diferentes cenários de erro.


## 9. Referências e Materiais Extras

- [Documentação oficial do Node.js](https://nodejs.org/pt-br/docs/)
- [Documentação do Express](https://expressjs.com/pt-br/)
- [MDN Web Docs — Métodos HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

