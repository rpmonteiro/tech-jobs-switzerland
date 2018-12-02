#!/bin/sh
ssh ric@138.68.102.136 <<EOF
 cd ~/jobs-backend
 git pull
 npm install — production
 pm2 restart all
 exit
EOF