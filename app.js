const express = require('express');
//const { Readable } = require('stream');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const audioRouter = require('./routes/audio');
app.use('/audio', audioRouter);

// // done! we export it so we can start the site in start.js
module.exports = app;
