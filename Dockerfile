FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci

COPY backend/prisma ./prisma
RUN npx prisma generate

COPY backend/src ./src
COPY backend/tsconfig.json ./
COPY start.sh ./
RUN chmod +x start.sh

RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

ENTRYPOINT ["/bin/sh", "/app/start.sh"]
