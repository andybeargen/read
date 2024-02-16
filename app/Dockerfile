FROM node:lts-alpine

WORKDIR /app
COPY ./app/package.json ./app/package-lock.json ./
RUN npm clean-install
COPY ./app .

RUN npm run prisma:generate
RUN npm run build

CMD ["sh", "docker-entrypoint.sh"]
