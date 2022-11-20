## Using Docker
1. First, build an image from the latest codebase
```
// inside /app folder
docker build . -t aram.tools/app
```
2. Create and start a container from the image with port numbers. 8080 is the port number we use, and 80 is the default port number that nginx uses inside the container
```
docker run -p 8080:80 aram.tools/app
```
3. Go to localhost:8080 on a web browser. You should see react app running