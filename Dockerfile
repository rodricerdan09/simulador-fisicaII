# ---- Etapa de dependencias ----
FROM node:20-alpine AS deps
WORKDIR /app

# Copiar solo archivos de dependencias para cachear capa
COPY package.json package-lock.json ./

# Instalar dependencias (incluye dev para build)
RUN npm ci

# ---- Etapa de build ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables de entorno por defecto (se sobreescriben al ejecutar)
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- Etapa de producción ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copiar archivos necesarios para producción
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copiar el archivo de features (config)
COPY --from=builder /app/src/config ./src/config

# Crear directorio data para SQLite y dar permisos
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
