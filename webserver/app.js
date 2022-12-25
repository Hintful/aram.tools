const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

require('dotenv').config();

const routes = require('./routes');

const app = express();

//middleware
app.use(bodyParser.json())
app.use(cors())

// PostgreSQL connection
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABSE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
})
client.connect(err => {
    if (err) throw err;
    console.log("Connected to PostgreSQL");
})

ENDPOINT_PREFIX = '/api'
if (process.env.NODE_ENV == "prod") {
    ENDPOINT_PREFIX = ''
}

// routes middleware
app.use(ENDPOINT_PREFIX, routes);

app.get('/', (request, response) => {
    response.send('Hello World!');
})

app.listen(process.env.NODE_DOCKER_PORT, 
    console.log(`App listening to port ${process.env.NODE_DOCKER_PORT}`)
);