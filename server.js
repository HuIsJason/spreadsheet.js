'use strict';

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/pub')));

app.get('/examples.html', (req, res) => {
  res.send('');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
