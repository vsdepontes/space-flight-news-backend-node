# Back-end Challenge 2021 🏅 - Space Flight News
> This is a challenge by Coodesh

## Description

Backend service for the Coodesh "[Back-end Challenge 2021 🏅 - Space Flight News](https://lab.coodesh.com/public-challenges/back-end-challenge)".  
The service consumes the [Space Flight News API](https://api.spaceflightnewsapi.net/v3/documentation), saving articles about space news on its own 
database and exposing them through its own API.

## Try it Live!

https://space-flight-news-backend-node.herokuapp.com/

## Technologies Used

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/) / [JavaScript](https://www.javascript.com/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Heroku](https://www.heroku.com)

## Installation

```bash
$ npm install
```

## Running the service

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## General Instructions

In order to successfully start the service, you also need to set the following environment variables:  

- MONGODB_CONNECTION_STRING -> The connection string (URI) to the Mongo Database

The default port where the server listens to the requests is ```3000```, but it can be changed by setting a different value to the optional ```PORT``` environment variable.

## Documentation

To see how to interact with the endpoints, please reffer to the Swagger documentation that can be found at ```/api```.

## Docker Instructions

When executing the image, you need to pass the following environment variables:  

- MONGODB_CONNECTION_STRING -> The connection string (URI) to the Mongo Database

The container will start with the service running and listening to the port ```3000```, if successfully started.