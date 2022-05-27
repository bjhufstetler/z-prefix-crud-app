FROM node:alpine

WORKDIR /app

COPY . /app

EXPOSE 8080

RUN npm install -g npm@8.11.0 &&\
    npm install -g nodemon@2.0.1.15 &&\
    npm install

CMD ["npm", "start"]