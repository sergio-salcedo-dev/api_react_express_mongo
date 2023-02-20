FROM node

WORKDIR /app

COPY ./frontend/package.json /app

RUN npm install -g npm@9.5.0
RUN npm install

COPY ./frontend/public /app/public
COPY ./frontend/src /app/src

EXPOSE $APP_PORT

CMD [ "npm", "start" ]
