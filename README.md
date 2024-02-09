# Project "Read"

## Tech Stack
- [Remix JS](https://remix.run/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Deployment
This project is Dockerized and can be deployed using the following commands:

### Development Environment
Make sure Docker is installed and running on your machine.

Run the following command to start the development server:
```bash
make dev_init # installs the required packages
make dev      # starts the development server
```

### Production
Make sure Docker is installed and running on your machine.

Run the following command to start the production server:
```bash
make prod
```
