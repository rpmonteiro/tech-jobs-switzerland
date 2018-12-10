#!/bin/sh

echo "Checking that the DB is ready..."
echo "Starting the app in $NODE_ENV mode"

if [ "$NODE_ENV" = "production" ]; then
  yarn start:prod
else
  yarn start:dev
fi
