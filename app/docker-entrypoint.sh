#!/bin/sh

set -e

npm run prisma:migrate

exec "/app/node_modules/.bin/remix-serve" "/app/build/server/index.js"
