#!/bin/sh

echo "Checking that the DB is ready..."
echo "running the following command: until psql -h $DATABASE_HOST -U postgres -c '\q'; do"
until psql -h "$DATABASE_HOST" -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - trying again in 5s..."
  sleep 5
done

echo "DB Ready!"

echo "Migrating the DB..."
yarn db:migrate

if [ "$NODE_ENV" = "production" ]; then
  yarn start
else
  yarn dev
fi

# use the latest node LTS release
FROM node:10.14.0-alpine
WORKDIR /usr/src/app

# Grab the ENV vars passed from the docker-compose file
ARG NODE_ENV
ENV NODE_ENV "$NODE_ENV"

ARG DATABASE_URL
ENV DATABASE_URL "$DATABASE_URL"

ARG DATABASE_HOST
ENV DATABASE_HOST "$DATABASE_HOST"

COPY package.json ./
COPY yarn.lock ./
RUN yarn

# copy the app
COPY . .

# expose port 3000 and start the app
EXPOSE 3000
CMD ./scripts/start.sh