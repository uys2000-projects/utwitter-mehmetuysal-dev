FROM node:alpine

RUN apk add chromium

WORKDIR /app

COPY . .

RUN yarn

CMD [ "yarn", "start" ]

EXPOSE 3000