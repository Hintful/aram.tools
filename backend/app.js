const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const app = express();

//middleware
app.use(bodyParser.json())
app.use(cors())

// routes middleware
app.use('/api', routes);

app.get('/', (request, response) => {
    response.send('Hello World!');
})

app.listen(3000, console.log('App listening to port 3000'));