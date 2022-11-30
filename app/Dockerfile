FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN chown root /usr/share/nginx/html/*
RUN chmod 755 /usr/share/nginx/html/*
RUN chmod 755 /usr/share/nginx/html/assets/*