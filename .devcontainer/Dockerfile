FROM node:lts-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm clean-install

COPY ./ ./

RUN npm run prisma:generate

CMD ["./node_modules/.bin/remix", "vite:dev"]
