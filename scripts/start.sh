#!/bin/sh
npm run build
npm run db:migrate up

if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  npm run dev
fi