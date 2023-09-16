FROM node:alpine
COPY . /app
WORKDIR /app
EXPOSE 80
CMD node app.js