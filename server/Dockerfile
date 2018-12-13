# use the latest node LTS release
FROM node:carbon
WORKDIR /usr/src/app

# Grab the args passed
ARG NODE_ENV
ENV NODE_ENV "$NODE_ENV"

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT

# install dependencies first
COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --force

# copy in our source code last, as it changes the most
COPY . .

USER node

# expose port 3000 and start the app
EXPOSE 3000
CMD ./scripts/start.sh