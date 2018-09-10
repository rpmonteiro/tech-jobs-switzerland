#!/bin/sh
yarn build
yarn run db-migrate up

if [ "$NODE_ENV" == "production" ] ; then
  yarn start
else
  yarn dev
fi