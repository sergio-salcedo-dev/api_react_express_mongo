FROM node:19

WORKDIR /app

COPY ./backend/package.json /app

RUN npm install -g npm@9.4.2
RUN npm install

COPY ./backend/src /app/src

EXPOSE $PORT

CMD [ "npm", "start" ]
