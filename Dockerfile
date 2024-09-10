FROM node:alpine

RUN apk add chromium

WORKDIR /app

COPY dist .

CMD [ "node", "main.cjs" ]

EXPOSE 3000