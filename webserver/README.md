## Running webserver using Docker (for dev)
1. First, build an image from the latest codebase
```
// inside /webserver folder
docker build -f Dockerfile.dev -t aram-tools/webserver .
```
2. Create and start a container from the image with port numbers
```
docker run -p 5000:5000 aram-tools/webserver
```
3. Go to localhost:5000 on your web browser. You should see aram.tools running. Enjoy!

## TODO
Use npm run build to create build bundle so that we can host a static content on top of nginx (i.e. change **npm run start** to **npm run build** and store the artifacts inside nginx)