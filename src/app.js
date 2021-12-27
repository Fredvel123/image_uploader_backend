const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv').config();
// middlewares
app.use(express.json());
app.use(cors())

// settings project.
app.set('port', process.env.PORT || PORT);

// Routes



// main url route
app.get('/', (req, res) => {
  res.send("the server is online");
})

module.exports = app;