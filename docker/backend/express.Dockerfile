FROM node:19

WORKDIR /app

COPY ./backend/package.json /app

RUN npm install -g npm@9.5.0
RUN npm install

COPY ./backend/src /app/src

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret

EXPOSE $APP_PORT

CMD [ "npm", "start" ]
