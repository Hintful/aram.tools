## Set up DynamoDB locally using Docker

```
docker run -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb
```

## Manage local DynamoDB using UI

```
npm install -g dynamodb-admin

export DYNAMO_ENDPOINT=http://localhost:8000
dynamodb-admin

Go to the url in a web browser that dynamodb-admin is running on
```

