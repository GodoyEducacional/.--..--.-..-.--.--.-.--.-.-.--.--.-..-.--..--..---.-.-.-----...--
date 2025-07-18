# Dicas

# Sempre documente as mudanças entre versões.

# Mantenha as versões antigas enquanto houver clientes utilizando.

# Planeje a descontinuação de versões antigas com aviso prévio.

# Para adicionar mais versões ou endpoints, basta seguir esse padrão de pastas e arquivos!

# http://localhost:3000/api/v1/usuarios → retorna { versao: 'v1', usuarios: ['Gabriel', 'Alex'] }

# http://localhost:3000/api/v2/usuarios → retorna { versao: 'v2', usuarios: ['Gabriel', 'Alex', 'Leticia'] }

# O versionamento mais comum e simples de uma API é feito através das rotas, incluindo a versão no caminho da URL. Por exemplo:

# /api/v1/usuarios → Versão 1 da API

# /api/v2/usuarios → Versão 2 da API

# Dessa forma, cada versão pode ter regras, respostas ou comportamentos diferentes, sem impactar quem ainda usa a versão anterior.

# Vantagens do versionamento por rota (URL)

# Clareza: Fica explícito para o cliente qual versão está usando.

# Facilidade de manutenção: Você pode manter várias versões funcionando ao mesmo tempo.

# Controle de evolução: Permite atualizar, corrigir ou até descontinuar versões antigas de forma organizada.

# Outras formas de versionar (menos comuns)

# Header HTTP: O cliente informa a versão no cabeçalho da requisição.

# Query String: A versão é passada como parâmetro na URL, ex: /api/usuarios?version=2.
