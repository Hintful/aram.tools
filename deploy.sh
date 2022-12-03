docker build -t choym0098/aram-client:latest -t choym0098/aram-client:$GIT_SHA  -f ./app/Dockerfile ./app
docker build -t choym0098/aram-webserver:latest -t choym0098/aram-webserver:$GIT_SHA  -f ./webserver/Dockerfile ./webserver

docker push choym0098/aram-client:latest
docker push choym0098/aram-webserver:latest

docker push choym0098/aram-client:$GIT_SHA
docker push choym0098/aram-webserver:$GIT_SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=choym0098/aram-client:$GIT_SHA
kubectl set image deployments/webserver-deployment webserver=choym0098/aram-webserver:$GIT_SHA
