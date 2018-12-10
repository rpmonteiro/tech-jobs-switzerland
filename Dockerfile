# use the latest node LTS release
FROM node:carbon
WORKDIR /usr/src/app

# Grab the args passed
ARG NODE_ENV
ENV NODE_ENV "$NODE_ENV"

# copy the app
COPY . .
RUN yarn

# expose port 3000 and start the app
EXPOSE 3000
CMD ./scripts/start.sh