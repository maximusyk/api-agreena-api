<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Agreena Description

-   Swagger API documentation: `/api/docs`
    <br>
-   Swagger API documentation JSON: `/api/docs-json`
    <br>
    <br>
-   Remote API URL: `https://api-agreena-api.herokuapp.com`
    <br>
-   Local API URL: `http://localhost:5000`

#

## Installation

```bash
$ npm install
```

#

## ENV

You need to create few `.env` files as described in `.example.env` file:

-   `.development.env` - for development environment
-   `.production.env` - for production environment

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
```

#

## Start Docker

```bash
$ docker-compose up -d --force-recreate
```

#

## DB Seed

_Commands described below is running in Docker automatically_

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

## Test

```bash
$ npm run test
```

#

## Auth
*Note: All users have the same **password*** – `strongPwd`

Steps for get auth token:
<br>

1. Send `POST` request with your credentials(`email`, `password`) to API: `/auth/local/signin`. You will receive tokens
   pair: `accessToken` and `refreshToken`.
   
   *Credentials example:*
   ```json
   {
      "email": "agreena.user1@gmail.com",
      "password": "strongPwd"
   }
   ```
   
2. Use accessToken to other requests in API.
3. Use refreshToken to get a new accessToken.
4. To get new accessToken with refreshToken, you need to send POST request to API: `/auth/refresh` with
   payload `{ "refreshToken": <refreshToken> }`.

To test open Swagger API Documentation in browser go to: `https://{host}/api/docs`.
