#!/bin/sh
yarn build

if [ "$NODE_ENV" == "production" ] ; then
  yarn start
else
  yarn dev
fi