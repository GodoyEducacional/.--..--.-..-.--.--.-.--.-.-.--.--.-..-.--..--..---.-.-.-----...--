# Hospedando sua API Node.js no Render

Guia de como hospedar a API deste projeto na plataforma Render.

## Pré-requisitos

- Conta gratuita no [Render](https://render.com/)
- Repositório do projeto hospedado no GitHub, GitLab ou Bitbucket

## Passo a Passo

### 1. Suba seu projeto para um repositório Git

Se ainda não fez isso, inicialize um repositório Git e envie seu código para o GitHub:

```bash
git init
git add .
git commit -m "Primeiro commit"
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git push -u origin master
```

### 2. Crie um novo serviço Web no Render

1. Acesse [https://dashboard.render.com/](https://dashboard.render.com/)
2. Clique em **New +** > **Web Service**
3. Conecte sua conta GitHub/GitLab/Bitbucket e selecione o repositório do projeto

### 3. Configure o serviço

- **Name:** Escolha um nome para o serviço
- **Branch:** Escolha a branch principal (geralmente `main` ou `master`)
- **Build Command:**  
  Render detecta automaticamente, mas se use:
  ```
  npm install
  ```
- **Start Command:**  
  Se o arquivo principal for `server.js`, use:
  ```
  node server.js ou npm start
  ```
- **Environment:** Node

### 4. Variáveis de ambiente

Adicione as variáveis de ambiente necessárias, como a string de conexão do banco de dados.  
Exemplo:

- `DATABASE_URL` ou conforme usado no seu `src/config/database.js`

Somente copiar tudo do .env e colocar no render!

### 5. Deploy

Clique em **Create Web Service**. O Render irá instalar as dependências e iniciar o deploy automaticamente.

### 6. Acesse sua API

Após o deploy, Render fornecerá uma URL pública para acessar sua API.

---

## Dicas

- Sempre que fizer push para a branch configurada, o Render fará o deploy automaticamente.
- Para logs, acesse a aba **Logs** no painel do Render.

---

O link de hospedagem do render é a API publicada na Web, substitui o localhost:3000, que usamos para teste todas as aulas!

### Lembrar de mudar a requisição do front-end para esse link de hospedagem

---

Pronto! Sua API estará disponível online via Render.  
Se precisar de ajuda, consulte a [documentação oficial do Render](https://render.com/docs).
