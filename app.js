const express = require('express');
const cors = require('cors');

const personController = require('./controllers/personController.js');

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:4200' }));

// Application testing API
app.get('/app/testing', (req, res) => {
  res.send({
    message: 'App is working fine',
    status: 200,
  });
});

app.use('/person', personController);

module.exports = app;
