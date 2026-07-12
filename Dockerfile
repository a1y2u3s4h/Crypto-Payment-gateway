# ---------- Build Stage ----------
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

# ---------- Production Stage ----------
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=0 /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=0 /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=0 /app/prisma ./prisma
COPY --from=0 /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]