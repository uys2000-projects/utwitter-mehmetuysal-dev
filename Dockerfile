FROM node:alpine

RUN apk add chromium

WORKDIR /app

COPY . .

CMD [ "yarn", "start" ]

EXPOSE 3000