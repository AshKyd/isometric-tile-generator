FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN apk update && apk upgrade
COPY dist /usr/share/nginx/html
RUN  chmod o+r -R /usr/share/nginx/html
