## Running react app using Docker (for dev)
1. First, build an image from the latest codebase
```
// inside /app folder
docker build -f Dockerfile.dev -t aram-tools/react-app .
```
2. Create and start a container from the image with port numbers
```
docker run -p 3000:3000 aram-tools/react-app
```
3. Go to localhost:3000 on your web browser. You should see aram.tools running. Enjoy!

## TODO
Use npm run build to create build bundle so that we can host a static content on top of nginx (i.e. change **npm run start** to **npm run build** and store the artifacts inside nginx)