<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

## Agreena Description

- Swagger API documentation: `/api/docs`
  <br>
- Swagger API documentation JSON: `/api/docs-json`

#

## Installation

```bash
$ npm install
```

#

## ENV

Create `.env` file from `.example.env` and set your environment

#

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#

## Docker configuration

Before start docker run this commands:

```bash
$ npm install 
$ npm run build
$ docker-compose build --no-cache
$ docker-compose up -d --force-recreate
```

#

## Start Docker

```bash
# API
$ docker-compose up -d --build api

# postgres - if you need only PostgreSQL
$ docker-compose up -d --build agreena_db adminer
```

#

## DB Seed

```bash 
# Create DB
$ npx sequelize-cli db:create

# Drop DB
$ npx sequelize-cli db:drop

# Insert all seed
$ npx sequelize-cli db:seed:all
 
# Undo all seed
$ npx sequelize-cli db:seed:undo:all

# Run migrations
$ npx sequelize-cli db:migrate
 
# Undo all migrations
$ npx sequelize-cli db:migrate:undo:all
```

#

## Auth

Steps for get auth token:
<br>

1. Send `POST` request with your credentials(`email`, `password`) to API: `/auth/local/signin`. You will receive tokens
   pair: `accessToken` and `refreshToken`.
2. Use accessToken to other requests in API.
3. Use refreshToken to get a new accessToken.
4. To get new accessToken with refreshToken, you need to send POST request to API: `/auth/refresh` with
   payload `{ "refreshToken": <refreshToken> }`.

To test open Swagger API Documentation in browser go to: `https://{host}/api/docs`.