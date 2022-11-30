FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# server environment
FROM nginx:alpine
COPY /nginx/nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=builder /app/dist /usr/share/nginx/html

ENV PORT 3000
ENV HOST 0.0.0.0
EXPOSE 3000
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
# FROM nginx
# EXPOSE 3000
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/dist /usr/share/nginx/html
# RUN chown root /usr/share/nginx/html/*
# RUN chmod 755 /usr/share/nginx/html/*
# RUN chmod 755 /usr/share/nginx/html/assets/*