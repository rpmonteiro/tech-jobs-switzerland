# use the latest node LTS release
FROM node:carbon
WORKDIR /usr/src/app

# Grab the ENV vars passed from the docker-compose file
ARG NODE_ENV
ENV NODE_ENV "$NODE_ENV"

ARG DATABASE_URL
ENV DATABASE_URL "$DATABASE_URL"

ARG DATABASE_HOST
ENV DATABASE_HOST "$DATABASE_HOST"

ARG DATABASE_PORT
ENV DATABASE_PORT "$DATABASE_PORT"

COPY package.json ./
COPY yarn.lock ./

RUN apt-get update && apt-get install -y postgresql-client
RUN yarn

# copy the app
COPY . .

# expose port 3000 and start the app
EXPOSE 3000
CMD ./scripts/start.sh