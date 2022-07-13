FROM node:16.3.0-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install rimraf
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:16.3.0-alpine as api
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./dist
RUN ls
CMD ["sh", "docker-entrypoint.sh"]