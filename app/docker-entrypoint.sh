#!/bin/sh

set -e

npm run prisma:migrate
npm run prisma:seed

exec "/app/node_modules/.bin/remix-serve" "/app/build/server/index.js"
