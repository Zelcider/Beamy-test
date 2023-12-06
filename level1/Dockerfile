FROM node:18-bullseye-slim

WORKDIR /app

COPY package*.json ./
COPY src ./src/

RUN npm installcq

RUN npm run build

