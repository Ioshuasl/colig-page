FROM node:20-slim

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Instala dependências de forma determinística para produção.
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

# Garante diretório de upload em runtime sem permissões abertas.
RUN mkdir -p uploads

EXPOSE 3333

CMD ["npm", "start"]