FROM node

WORKDIR /app

COPY ./backend/package*.json /app

RUN npm install

COPY ./backend /app/

EXPOSE 80

CMD [ "npm", "start" ]
