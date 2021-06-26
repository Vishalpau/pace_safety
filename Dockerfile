FROM node:14.4.0-alpine
RUN npm install -g create-react-app \
                   create-react-native-app \
                   react-native-cli
RUN mkdir /app
WORKDIR /app
ADD . /app

RUN npm install
RUN npm run-script build
CMD npm run start:prod
