# use the latest node LTS release
FROM node:carbon
WORKDIR /usr/src/app

# copy package.json and package-lock.json and install packages. we do this
# separate from the application code to better use docker's caching
# `npm install` will be cached on future builds if only the app code changed
COPY package*.json ./
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# copy the app
COPY . .

# expose port 3000 and start the app
EXPOSE 3000
CMD ./scripts/start.sh