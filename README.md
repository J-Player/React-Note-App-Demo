# React Note App Demo
![react note app demo](https://github.com/J-Player/React-Note-App-Example/assets/48096757/396a02f3-1332-48fe-9904-00bf73c2aeea)
Um simples gerenciador de notas do usuário.
Foi desenvolvido usando a MERN stack (MongoDB, ExpressJS, React e NodeJS)

## Pré-requisitos
- Docker
- Node 18 ou superior

## Como usar
1. No diretório `backend`, crie um arquivo `.env` com as seguintes propriedades:
<pre><code>
  JWT_SECRET= # A palavra secreta para usar na assinatura dos tokens JWT
  DB_URI= # A URI do banco de dados MongoDB (opcional - Por padrão usará a URI do docker-compose.yml)
</code></pre>
2. Ainda no diretório `backend`, inicialize o `docker-compose.yml` do banco de dados:
<pre><code>docker compose up -d</code></pre>
3. Na raiz do projeto, instale as dependências:
<pre><code>npm run build</code></pre>
4. Inicialize a aplicação:
<pre><code>npm start</code></pre>
