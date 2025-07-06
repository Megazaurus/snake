FROM nginx:stable-alpine

ENV TZ="Europe/Kiev"
RUN apk add --no-cache tzdata curl && cp /usr/share/zoneinfo/$(echo $TZ) /etc/localtime && echo $TZ > /etc/timezone

ADD dockerfiles/nginx/default.conf /etc/nginx/conf.d/

RUN mkdir -p /var/www/html
