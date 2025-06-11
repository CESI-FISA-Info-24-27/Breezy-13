FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Crée le dossier d'uploads (pour éviter les erreurs au démarrage)
RUN mkdir -p uploads

EXPOSE 4000

CMD ["npm", "run", "dev"]