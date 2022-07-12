FROM node:16.3.0-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:16.3.0-alpine as api
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build /usr/src/app/docker-entrypoint.sh ./
COPY --from=build /usr/src/app/.sequelizerc ./
COPY --from=build /usr/src/app/config ./
COPY --from=build /usr/src/app/migrations ./
COPY --from=build /usr/src/app/seeders ./
RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./dist
CMD ["sh", "docker-entrypoint.sh"]