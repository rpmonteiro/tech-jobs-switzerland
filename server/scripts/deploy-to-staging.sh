#!/bin/sh
ssh -T ric@138.68.102.136 '
  docker pull eu.gcr.io/jobs-backend-224200/jobs-backend:latest-staging
  docker run -e "NODE_ENV=production" eu.gcr.io/jobs-backend-224200/jobs-backend:latest-staging
  exit
'