FROM node:lts-alpine

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm clean-install
COPY ./ .

RUN npm run prisma:generate
RUN npm run build

CMD ["sh", "docker-entrypoint.sh"]
