# echo "Initting the project"
# make dev_init

$env:DATABASE_URL="postgres://postgres:example@localhost:5432/postgres"
echo "Starting the development environment"
make dev
