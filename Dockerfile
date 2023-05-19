FROM node:alpine

RUN mkdir /api

WORKDIR /api

COPY package*.json ./

RUN npm i


COPY . .

RUN npm run build

CMD cp src/tokens.json /api && npm run start