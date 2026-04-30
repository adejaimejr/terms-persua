# syntax=docker/dockerfile:1
# Multi-stage build, terms.persua.com.br

# Stage 1, build do site estatico em Node
FROM node:20-alpine AS builder
WORKDIR /app

# Dependencias primeiro (cache de layer)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev

# Codigo + conteudo
COPY build.js ./
COPY src ./src

# Build estatico
RUN node build.js

# Stage 2, runtime nginx servindo dist/
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
