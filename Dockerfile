FROM node:alpine

RUN apk add chromium

WORKDIR /app

COPY dist .

CMD [ "yarn", "start" ]

EXPOSE 3000