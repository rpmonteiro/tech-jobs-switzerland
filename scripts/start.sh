#!/bin/sh

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

if [ "$NODE_ENV" == "production" ] ; then
  yarn start
if [ "$NODE_ENV" == "test" ] ; then
  yarn db:migrate
  yarn test
else
  yarn dev
fi