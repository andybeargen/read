echo Initting the project
npm ci --prefix ./app
echo "DATABASE_URL=postgres://postgres:example@localhost:5432/postgres" > ./app/.env.development

echo Starting the development environment
npm run prisma:generate --prefix ./app
docker compose -f "docker-compose.yml" up -d --build db
npm run prisma:migrate:development --prefix ./app
npm run dev --prefix ./app
