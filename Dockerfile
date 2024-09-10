FROM node

RUN apt-get install chromium-browser chromium-codecs-ffmpeg

WORKDIR /app

COPY . .

RUN yarn

CMD [ "yarn", "start" ]

EXPOSE 3000