<<<<<<< Updated upstream
FROM node:20-alpine AS builder
=======
FROM node:20-alpine

RUN apk add --no-cache bash
>>>>>>> Stashed changes

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

<<<<<<< Updated upstream
RUN npm run dev

# Étape de production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
=======
EXPOSE 3000
CMD ["npm", "run", "dev"]
>>>>>>> Stashed changes
