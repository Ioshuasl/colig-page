# ==========================================
# ESTÁGIO 1: Build (Node.js)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Argumentos de build alinhados com o projeto (README e código).
ARG VITE_API_BASE_URL
ARG VITE_BACKEND_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências de forma determinística para o build do Vite.
RUN npm ci

# Copia todo o código fonte
COPY . .

# Gera o build de produção (cria a pasta /dist)
RUN npm run build

# ==========================================
# ESTÁGIO 2: Servidor Web (Nginx)
# ==========================================
FROM nginx:alpine

# Remove a config padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados no estágio anterior para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]