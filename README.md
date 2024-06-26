# LitCritters

[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/andybeargen/read)

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

#### Windows
Alternatively, you can run the following commands to start the development server
without having to install `make`:
```powershell
dev.ps1
```

### Production
Make sure Docker is installed and running on your machine.

Run the following command to start the production server:
```bash
make prod
```
