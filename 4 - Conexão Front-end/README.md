# Projeto CRUD de Tarefas (ToDo) — Node.js, Express, MongoDB e Frontend Simples

## Visão Geral

Este projeto é um exemplo didático de CRUD de tarefas (ToDo), ideal para ensinar alunos a:

- Conectar um frontend simples (HTML + JS) ao backend usando `fetch` ou `axios`
- Entender o ciclo completo de uma aplicação web: do input do usuário até o banco de dados e de volta

---

## Estrutura do Projeto

```
/config             # Configuração do banco de dados MongoDB
/controllers        # Lógica das operações (controllers)
/models             # Modelos do Mongoose (estrutura dos dados)
/routes             # Definição das rotas da API
/todo.js            # Ponto de entrada da aplicação (servidor Express)
frontend.html       # Exemplo de frontend usando fetch
frontendaxios.html  # Exemplo de frontend usando axios
```

## Necessário instalar o cors

```bash
    npm install cors
```

---

## Endpoints da API

- **GET** `/tarefas` — Lista todas as tarefas
- **GET** `/tarefas/:id` — Busca uma tarefa pelo ID
- **POST** `/tarefas` — Cria uma nova tarefa  
  Exemplo de body: `{ "descricao": "Minha tarefa" }`
- **PUT** `/tarefas/:id` — Atualiza uma tarefa  
  Exemplo de body: `{ "descricao": "Nova descrição" }`
- **DELETE** `/tarefas/:id` — Remove uma tarefa

---

## Como funciona a conexão Frontend / Backend

### 1. O Backend

- O backend expõe rotas REST para cada operação do CRUD.
- Usa `express.json()` para aceitar JSON no corpo das requisições.
- Usa `cors()` para permitir requisições do frontend (importante para testes locais).

### 2. O Frontend

Existem dois exemplos de frontend:

#### **frontend.html** (usa fetch)

- Envia uma tarefa para o backend via POST usando `fetch`.
- Permite excluir uma tarefa via DELETE.
- Exemplo de código para criar tarefa:
  ```js
  fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao }),
  });
  ```

#### **frontendaxios.html** (usa axios)

## Necessário instalar o axios

```bash
    npm install axios
```

- Faz o mesmo que o exemplo acima, mas usando a biblioteca Axios.
- Exemplo de código para criar tarefa:
  ```js
  axios.post("http://localhost:3000/tarefas", { descricao }).then((res) => {
    // resposta do backend
  });
  ```

**Ambos os arquivos podem ser abertos diretamente no navegador.**  
Basta preencher o campo de descrição e clicar em "Adicionar" para enviar uma tarefa ao backend.

---

### O fetch é nativo do JS, essa é a diferença (Explicação rápida)

## Fluxo de Dados (Resumo)

1. O usuário digita uma descrição no campo do frontend.
2. Ao clicar em "Adicionar", o frontend faz uma requisição POST para o backend.
3. O backend recebe, valida e salva a tarefa no banco de dados.
4. O backend responde com os dados da tarefa criada.
5. O frontend pode exibir a resposta na tela.

---

## Dicas para Ministrar a Aula

- Explique a diferença entre `fetch` e `axios` (ambos fazem requisições HTTP, mas axios é uma biblioteca externa com mais recursos).
- Demonstre como o CORS permite que o frontend acesse o backend local, mostrar erro no navegador sem ele (Inspecionar/Network).
- Solicite aos alunos a modificar o frontend para listar, editar e excluir tarefas.
- Mostre como inspecionar as requisições no navegador (Aba Network do DevTools).s

---
