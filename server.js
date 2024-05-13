require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.port;
const hostname = '127.0.0.1';

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

require(`${__dirname}/app/routes.js`)(app);

app.listen(port, hostname, () => {
    console.log(`${__dirname}/app/routes.js`);
    console.log(`Server running at http://${hostname}:${port}/`);
  });