FROM node:20-alpine

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
RUN apk add --no-cache bash

>>>>>>> c738c84 (feat : réglage du docker compose de la webapp #42)
=======
>>>>>>> c2d9ba3 (feat : fix)
WORKDIR /app
=======
WORKDIR /webapp
>>>>>>> 513fd9f (feat : Tentative de fusions avec main #39)

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]