FROM node:20-alpine

<<<<<<< HEAD
=======
RUN apk add --no-cache bash

>>>>>>> c738c84 (feat : réglage du docker compose de la webapp #42)
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
