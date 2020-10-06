FROM node:14.9.0-alpine

WORKDIR /redtetris/client/
COPY package*.json ./

RUN npm install
EXPOSE 3000

CMD ["npm", "run", "client-dev"]