const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql2');
require('dotenv').config();

const routes = require('./routes');

const app = express();

//middleware
app.use(bodyParser.json())
app.use(cors())

// mysql sync
const database = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// routes middleware
app.use('/api', routes);

app.get('/', (request, response) => {
    response.send('Hello World!');
})

app.listen(process.env.NODE_DOCKER_PORT, 
    console.log(`App listening to port ${process.env.NODE_DOCKER_PORT}`)
);