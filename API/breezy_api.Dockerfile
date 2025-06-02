FROM node:22.16.0
WORKDIR /api
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ]