# aram.tools

## Front-end App
### Installation
Run `npm install` in `/aram.tools/app/` directory to install.

### Server
Run `npm run dev` in `/aram.tools/app/` directory to start up the server for front-end app.

## Travis-CI workflow
1. Tell Travis we need a copy of docker running
2. Build our image using Dockerfile.dev
3. Tell Travis how to run test suites
4. Tell Travis how to deploy arma.tools to AWS
