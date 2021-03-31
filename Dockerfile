FROM node:14.15-alpine

WORKDIR /app
COPY ./package*.json  ./
RUN npm i
COPY . .
