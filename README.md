# COLIG - Plataforma Institucional + Painel Administrativo

Projeto full-stack para o Conselho de Ligas Academicas (COLIG), composto por:
- `frontend/`: landing page institucional + painel administrativo.
- `backend/`: API REST com autenticacao JWT, CRUD de conteudo e upload de imagens em S3.

---

## Escopo do Projeto

O projeto foi construido para permitir que o conselho:
- publique e atualize conteudos da landing page sem editar codigo manualmente;
- gerencie membros, eventos, noticias e usuarios por painel administrativo;
- mantenha autenticacao e controle de acesso para rotas sensiveis;
- realize upload, consulta e exclusao de imagens em bucket S3.

---

## Stack Utilizada

## Frontend (`frontend/`)
- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- React Router DOM 7
- Motion (animacoes/transicoes)
- Axios (consumo da API)
- Lucide React (icones)

## Backend (`backend/`)
- Node.js (ESM)
- Express 5
- Sequelize + Sequelize CLI
- PostgreSQL (`pg` + `pg-hstore`)
- JWT (`jsonwebtoken`) + `bcrypt`
- Upload para S3:
  - `multer`
  - `aws-sdk` (v2, utilizado no `src/config/s3.js`)
  - `@aws-sdk/client-s3` (instalado no projeto)
- Swagger UI (`swagger-ui-express`)

---

## Principais Requisitos Funcionais

### Autenticacao e Sessao
- Login por `username` **ou** `email` + senha.
- Logout com revogacao de token (em memoria).
- Middleware JWT para proteger rotas administrativas.
- Frontend com interceptor para redirecionar ao `/login` quando receber `401` em area admin.

### Gestao de Conteudo
- CRUD de:
  - usuarios
  - membros
  - eventos
  - noticias
- Listagens com filtros de busca, paginacao e ordenacao (conforme service/endpoint).

### Midia (S3)
- Upload de imagem.
- Consulta por `objectName`/URL.
- Exclusao de imagem.
- Componente reutilizavel de upload no frontend (preview, drag and drop, paste, troca/remocao).

### Documentacao de API
- Colecao Postman: `backend/src/docs/postman-collection.json`
- Swagger OpenAPI JSON: `backend/src/docs/swagger.json`
- Swagger UI em runtime: `/api/docs`

---

## Estrutura de Pastas (Resumo)

### Raiz
```txt
colig/
  backend/
  frontend/
  README.md
```

### Backend
```txt
backend/
  config/
    config.cjs
  src/
    config/
    controllers/
    database/
      migrations/
      models/
      seeders/
    docs/
      postman-collection.json
      swagger.json
    middlewares/
    models/
    routes/
    scripts/
    services/
    app.js
    server.js
  .env.example
  .sequelizerc
  package.json
```

### Frontend
```txt
frontend/
  src/
    components/
      admin/
      shared/
    hooks/
    layouts/
    pages/
      admin/
    services/
    types/
    App.tsx
    main.tsx
  index.html
  vite.config.ts
  package.json
```

---

## Banco de Dados (Docker)

Comando para subir PostgreSQL local:

```bash
docker run --name colig-db -e POSTGRES_PASSWORD=colig_admin -e POSTGRES_DB=colig -p 5432:5432 -d postgres
```

---

## Configuracao de Ambiente

## Backend
1. Copie o arquivo de exemplo:
   - `backend/.env.example` -> `backend/.env`
2. Ajuste as variaveis conforme seu ambiente (DB, JWT, S3).

Variaveis principais:
- `NODE_ENV`
- `PORT`
- `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_HOST`, `DB_PORT`
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_BUCKET_NAME`

## Frontend
Opcionalmente configure:
- `VITE_API_BASE_URL` (padrao: `http://localhost:3333/api`)
- `VITE_BACKEND_BASE_URL` (padrao: `http://localhost:3333`)

---

## Instalacao do Projeto

### 1) Backend
```bash
cd backend
npm install
```

### 2) Frontend
```bash
cd frontend
npm install
```

---

## Execucao em Desenvolvimento

### Backend
```bash
cd backend
npm run db:test
npm run dev
```

### Seed de dados para testes praticos (backend)
```bash
cd backend
npx sequelize-cli db:seed:all --env development
```

### Frontend
```bash
cd frontend
npm run dev
```

---

## Compilacao (Build)

### Frontend
```bash
cd frontend
npm run build
```

Para visualizar build local:
```bash
npm run preview
```

### Backend
O backend nao tem etapa de build (JS). Para producao:
```bash
cd backend
npm start
```

---

## Rotas Principais da API (Resumo)

Base local: `http://localhost:3333`

- Publicas:
  - `GET /health`
  - `GET /api`
  - `POST /api/users/login`
  - `GET /api/members`
  - `GET /api/events`
  - `GET /api/news`
  - `GET /api/docs`
  - `GET /api/docs/json`

- Protegidas (JWT Bearer):
  - CRUD de `users` (exceto login)
  - CRUD administrativo de `members`, `events`, `news`
  - rotas de `s3`

---

## Observacoes

- Em desenvolvimento, o backend sincroniza schema com `sequelize.sync({ alter: true })`.
- A revogacao de token (logout) esta em memoria (reinicio da API limpa revogacoes).
- Para producao, recomenda-se:
  - estrategia com refresh token;
  - revogacao persistente (Redis/DB);
  - endurecimento de politicas de CORS e seguranca.
