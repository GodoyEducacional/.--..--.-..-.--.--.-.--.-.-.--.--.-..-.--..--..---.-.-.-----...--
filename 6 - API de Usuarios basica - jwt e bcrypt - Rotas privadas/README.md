# API de Autenticação com Node.js, Express e MongoDB

## Visão Geral

Este projeto é uma API para autenticação de usuários, utilizando Node.js, Express, MongoDB (via Mongoose) e bcrypt para criptografia e JWT.  
Ideal para demonstração de autenticação, cadastro, login seguro e uso de tokens.

---

## Instalar:

```bash
npm install bcryt
npm install jsonwebtoken
```

## Funcionalidades

- Cadastro de usuário com senha criptografada
- Login com geração de token JWT
- Rota protegida (acesso apenas com token válido)
- Middleware de autenticação
- Respostas e validações detalhadas
- Pronto para integração com frontend (CORS liberado)

---

## Estrutura de Pastas

```
Jwt-jsonwebtoken-exp/
│
├── app.js                # Arquivo principal da API
├── models/
│   └── usuarioModel.js   # Model do usuário (Mongoose)
├── package.json          # Dependências e scripts
├── .gitignore            # Ignora node_modules e .env
├── Usar-rota-privada.mkd # Exemplos de uso de rota protegida
└── ...                   # Outros arquivos
```

---

## Principais Dependências

- **bcrypt**: Criptografia de senhas
- **jsonwebtoken**: Geração e validação de JWT

## Necessário explicar a diferença entre elas, pois é bibliotecas novas diante as outras aulas

---

## Como funciona a autenticação?

- O usuário faz login e recebe um **token JWT**.
- Para acessar rotas protegidas, o frontend deve enviar esse token no header `Authorization`.
- O middleware `checkToken` valida o token antes de liberar o acesso.

---

## Exemplos de uso (Postman/Insomnia)

### Cadastro

- POST `http://localhost:3000/auth/register`
- Body: JSON

### Login

- POST `http://localhost:3000/auth/login`
- Body: JSON
- **Guarde o token retornado!**

### Rota protegida

- GET `http://localhost:3000/user/<id_do_usuario>`
- Header:  
  `Authorization: Bearer <token_jwt>`

---

## Dicas para aula

- Explique a importância de nunca retornar a senha do usuário. (Modificar caso queira)
- Demonstre o fluxo completo: cadastro → login → acesso protegido.
- Fale sobre a importância do uso de JWT e criptografia de senhas.

---

---

## Desafio para os alunos:

### Transformar essa API, já funcional em uma API Restful, conforme aulas passadas

---

## Possíveis melhorias para produção

- Implementar refresh token e logout seguro
- Rate limiting -> proteção contra brute force
- Armazenar refresh tokens no banco (blacklist)

---

## Observações

- O projeto está pronto para ser consumido por qualquer frontend e os moderno (React, Vue, Angular, etc).
- O arquivo `Usar-rota-privada.mkd` traz exemplos práticos de uso da rota protegida.

---
