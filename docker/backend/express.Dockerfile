FROM node

WORKDIR /app

COPY ./backend/package*.json /app

RUN npm install -g npm@9.4.1
RUN npm install

COPY ./backend/src /app/src

EXPOSE 80

CMD [ "npm", "start" ]
