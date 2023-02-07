FROM node

WORKDIR /app

COPY ./frontend/package.json /app

RUN npm install

COPY ./frontend/public /app/public
COPY ./frontend/src /app/src

EXPOSE $PORT

CMD [ "npm", "start" ]
