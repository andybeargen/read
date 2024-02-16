#!/bin/sh

set -e

npm run prisma:migrate

exec npm run start
