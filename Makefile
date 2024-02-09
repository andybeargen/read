dev:
	npm ci --prefix ./app
	echo "DATABASE_URL=postgres://postgres:example@localhost:5432/postgres" > ./app/.env
	npm run prisma:generate --prefix ./app
	docker compose -f "docker-compose.yml" up -d --build db
	npm run dev --prefix ./app

prod:
	docker compose -f "docker-compose.yml" up -d --build

down:
	docker compose -f "docker-compose.yml" down
