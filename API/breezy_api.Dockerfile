FROM node:22.16.0
WORKDIR /api
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
