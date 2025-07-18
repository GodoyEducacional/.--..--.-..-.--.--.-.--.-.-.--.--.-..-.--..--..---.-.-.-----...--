## Envio de E-mail com Nodemailer

A API possui uma rota POST `/send-email` para envio de e-mails.

### Configuração

Adicione as seguintes variáveis no seu arquivo `.env`:

```
# Configurações do SMTP para envio de e-mail
SMTP_HOST=smtp.seuprovedor.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu_email@provedor.com
SMTP_PASS=sua_senha_email
SMTP_FROM=Seu Nome <seu_email@provedor.com>
```

### Exemplo de requisição

POST `/send-email`

Body (JSON):

```json
{
  "to": "destinatario@provedor.com",
  "subject": "Assunto do e-mail",
  "text": "Texto do e-mail",
  "html": "<b>Texto em HTML</b>"
}
```

- O campo `to` pode ser um e-mail ou uma lista de e-mails separados por vírgula.
- O campo `text` ou `html` é obrigatório (pelo menos um).

A resposta de sucesso será:

```json
{
  "msg": "E-mail enviado com sucesso!",
  "info": {
    /* informações do envio */
  }
}
```

## Nesta API foi adicionado o envio do e-mail no registro de usuario

---

# Permissões do provedor

# O e-mail e senha devem estar corretos.

# O provedor deve permitir envio SMTP (alguns bloqueiam por padrão ou exigem configurações extras).

---
