/* server.js - Express server*/
'use strict';
const log = console.log;
log('Express server');

const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/pub')));

app.get('/examples.html', (req, res) => {
  res.send('');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
