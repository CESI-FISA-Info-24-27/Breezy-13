FROM node:22.16.0

# On prépare l'installation des dépendances NodeJS ainsi que les fichiers de l'api
WORKDIR /api
COPY . .
RUN npm install

# On met en place netcat + les droits d'exécution pour attendre que la bdd s'est bien installée
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*
RUN chmod +x ./wait-for-it.sh

# On expose le bon port et on lance l'API
EXPOSE 3000
CMD [ "npm", "start" ]