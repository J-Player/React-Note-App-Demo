# React Note App Example
![react note app example](https://github.com/J-Player/React-Note-App-Example/assets/48096757/396a02f3-1332-48fe-9904-00bf73c2aeea)
Um simples gerenciador de notas do usuário.
Foi desenvolvido usando a MERN stack (MongoDB, ExpressJS, React e NodeJS)

## Pré-requisitos
- Docker
- Node 18 ou superior

## Como usar
1. Instale as dependências do backend e do frontend:
<pre><code>cd backend && npm i && cd ../frontend && npm i && cd ..</code></pre>
2. Inicialize o `docker-compose.yml` do banco de dados:
<pre><code>cd backend && docker compose up</code></pre>
3. Inicialize a API (no diretório "backend"):
<pre><code>cd backend && npm run dev</code></pre>
4. Inicialize a aplicação React (no diretório "frontend"):
<pre><code>cd frontend && npm run dev</code></pre>
