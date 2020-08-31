FROM node:14.9.0-alpine

WORKDIR /redtetris/server/
COPY package*.json ./

RUN npm install
EXPOSE 3004

CMD ["npm", "run", "srv-dev"]