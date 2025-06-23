FROM node:20-alpine

WORKDIR /fileserver

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p uploads

CMD ["npm", "run", "dev"]