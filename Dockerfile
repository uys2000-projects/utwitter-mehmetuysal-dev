FROM node:alpine

RUN apk add chromium

WORKDIR /app

COPY dist .

CMD [ "node", "cjs" ]

EXPOSE 3000