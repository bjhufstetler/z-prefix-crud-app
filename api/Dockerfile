FROM node:alpine
WORKDIR /app
COPY . /app
EXPOSE 8080
RUN npm install -g nodemon@2.0.15 &&\
    npm install
CMD npm start