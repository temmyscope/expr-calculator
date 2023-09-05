FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000