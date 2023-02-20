FROM node:latest
RUN mkdir -p /usr/src/arduino-project

WORKDIR /usr/src/arduino-project

COPY /arduino-project/package.json  /usr/src/arduino-project

RUN npm install

COPY /arduino-project /usr/src/arduino-project

EXPOSE 3001
EXPOSE 7000
CMD [ "npm", "start"]

