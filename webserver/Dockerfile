FROM node:16-alpine

WORKDIR /webserver
COPY package.json .
RUN npm install
COPY . .
CMD npm run dev
