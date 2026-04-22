# Backend Colig

Estrutura inicial do backend com Node.js, Express, Sequelize (ESM no app), JWT, bcrypt e suporte a upload para S3.

## Estrutura de dados (baseado no mockData)

### `users`

| Campo | Tipo (Sequelize) | Obrigatório | Regras |
| --- | --- | --- | --- |
| id | INTEGER | Sim | PK, auto increment |
| email | STRING | Sim | Único, formato de e-mail |
| password | STRING | Sim | Senha hash (próximo passo) |
| createdAt | DATE | Sim | Timestamp automático |
| updatedAt | DATE | Sim | Timestamp automático |

### `members`

| Campo | Tipo (Sequelize) | Obrigatório | Regras |
| --- | --- | --- | --- |
| id | INTEGER | Sim | PK, auto increment |
| name | STRING | Sim | Nome do membro |
| role | STRING | Sim | Cargo/função |
| image | TEXT | Não | URL da imagem |
| createdAt | DATE | Sim | Timestamp automático |
| updatedAt | DATE | Sim | Timestamp automático |

### `events`

| Campo | Tipo (Sequelize) | Obrigatório | Regras |
| --- | --- | --- | --- |
| id | INTEGER | Sim | PK, auto increment |
| title | STRING | Sim | Título do evento |
| date | DATEONLY | Sim | Data do evento |
| category | STRING | Sim | Ex.: Simpósio, Workshop |
| status | ENUM | Sim | `upcoming` ou `past` |
| description | TEXT | Sim | Descrição completa |
| image | TEXT | Não | URL da imagem |
| createdAt | DATE | Sim | Timestamp automático |
| updatedAt | DATE | Sim | Timestamp automático |

### `news`

| Campo | Tipo (Sequelize) | Obrigatório | Regras |
| --- | --- | --- | --- |
| id | INTEGER | Sim | PK, auto increment |
| title | STRING | Sim | Título da notícia |
| date | DATEONLY | Sim | Data de publicação |
| summary | TEXT | Sim | Resumo curto |
| createdAt | DATE | Sim | Timestamp automático |
| updatedAt | DATE | Sim | Timestamp automático |

## Subir PostgreSQL com Docker

```bash
docker run --name colig-db -e POSTGRES_PASSWORD=colig_admin -e POSTGRES_DB=colig -p 5432:5432 -d postgres
```

## Fluxo inicial

1. Copiar `.env.example` para `.env`.
2. Instalar dependências: `npm install`.
3. Testar banco: `npm run db:test`.
4. Rodar em desenvolvimento: `npm run dev`.
