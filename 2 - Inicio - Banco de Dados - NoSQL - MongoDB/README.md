# Servidor Express Simples com MongoDB — Guia Didático

## 1. Introdução

Este projeto demonstra como criar uma API de tarefas (to-do list) usando Node.js, Express e MongoDB (com Mongoose). O objetivo é ensinar, na prática.

---

## 2. Estrutura do Projeto

- `todo.js`: Arquivo principal do servidor Express, onde estão todas as rotas e lógica da API.
- `db.js`: Responsável pela conexão com o banco de dados MongoDB usando Mongoose.
- `models/ToDo.js`: Define o modelo (schema) das tarefas no banco.
- `package.json`: Gerencia as dependências e scripts do projeto.

---

## 3. Pré-requisitos

- **Node.js** instalado ([Download Node.js](https://nodejs.org/))
- **MongoDB Atlas**
- Conta gratuita no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) e criar um Cluster (Grátis)
- Ferramenta de teste de API (Postman, Insomnia, Thunder Client, etc.)

---

## 4. Instalação e Configuração

### 4.1. Instalando as Dependências

```bash
    npm install dotenv
    npm install mongodb
    npm install mongoose
```

### 4.2. Configurando as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (substitua pelos seus dados do MongoDB Atlas), gerado ao criar o Cluster, se não sabe redefinir a senha e ver o usuario no MongoDB:

```
DB_USER=seu_usuario
DB_PASS=sua_senha
```

> **Importante:** Nunca compartilhe a senha real em repositórios públicos!

---

## 5. Estrutura do Banco de Dados

O projeto utiliza o MongoDB e o Mongoose para modelar as tarefas.

### Modelo da Tarefa (`models/ToDo.js`):

- **descricao**: String (obrigatório)

Exemplo de documento salvo no banco:

```json
{
  "_id": "665f1c2e2b1e4c0012345678",
  "descricao": "Ler a documentação oficial e fazer exercícios"
}
```

- **ID o mongodb cria automaticamente**

---

## 6. Rodando o Servidor

- Para rodar normalmente:
  ```bash
  npm start
  ```
- Para rodar com reinício automático ao salvar arquivos (recomendado para desenvolvimento):
  ```bash
  npm run dev
  ```

O servidor estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 7. Rotas da API

### 7.1. Rota de Boas-vindas

- **GET /**  
  Resposta: `"Bem-vindo à API"`

### 7.2. Listar todas as tarefas

- **GET /tarefas**  
  Retorna um array com todas as tarefas cadastradas.

### 7.3. Buscar tarefa por ID

- **GET /tarefas/:id**  
  Retorna a tarefa correspondente ao ID informado.

### 7.4. Criar nova tarefa

- **POST /tarefas**  
  Corpo (JSON):  
  ```json
  {
    "descricao": "Descrição detalhada"
  }
  ```
  Resposta: tarefa criada.

### 7.5. Atualizar tarefa existente

- **PUT /tarefas/:id**  
  Corpo (JSON):  
  ```json
  {
    "descricao": "Nova descrição"
  }
  ```
  Resposta: tarefa atualizada.

### 7.6. Remover tarefa

- **DELETE /tarefas/:id**  
  Remove a tarefa correspondente ao ID informado.

---

## 8. Testando a API

Use o Postman, Insomnia ou Thunder Client para testar as rotas. Exemplos:

- Listar tarefas:  
  `GET http://localhost:3000/tarefas`
- Criar tarefa:  
  `POST http://localhost:3000/tarefas`  
  Body (JSON):  
  ```json
  {
    "descricao": "Fazer um CRUD completo"
  }
  ```

---

## 9. Dicas para a Aula

- Peça para os alunos criarem um campo novo (Titulo) no DB e adicionar as rotas e tratarem novos erros.
- Mostre como ver o status da resposta no Postman (aba "Status Code").
- Incentive os alunos a testarem diferentes cenários (ex: tentar atualizar tarefa inexistente).
- Explique o que é JSON e XML
- Mongoose, faz alterações e acessos ao banco, mongodb gera a conexão

---

## 10. Referências

- [Documentação do Node.js](https://nodejs.org/pt-br/docs/)
- [Documentação do Express](https://expressjs.com/pt-br/)
- [Documentação do Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MDN Web Docs — Métodos HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)