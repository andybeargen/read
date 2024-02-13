#!/bin/sh

npm run prisma:migrate
exec npm run start
