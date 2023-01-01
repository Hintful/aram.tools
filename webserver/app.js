const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

require('dotenv').config();

const routes = require('./routes');

const app = express();
const db = require("./models");

//middleware
app.use(bodyParser.json())
app.use(cors())

// PostgreSQL connection
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

ENDPOINT_PREFIX = '/api'
if (process.env.NODE_ENV == "prod") {
    ENDPOINT_PREFIX = '/'
}

// routes middleware
app.use(ENDPOINT_PREFIX, routes);

app.get('/', (request, response) => {
    response.send('Hello World!');
})

app.listen(process.env.NODE_DOCKER_PORT, 
    console.log(`App listening to port ${process.env.NODE_DOCKER_PORT}`)
);