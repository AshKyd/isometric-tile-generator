FROM node:18-alpine3.17
WORKDIR /usr/src/app
COPY . /usr/src/app
# RUN apk add --no-cache python3 py3-pip build-base
RUN npm ci && npm run build

FROM nginx:1.23.3-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN apk update && apk upgrade
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html