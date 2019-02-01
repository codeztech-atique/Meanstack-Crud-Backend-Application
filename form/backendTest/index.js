const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const Personcontroller = require('./controllers/personController');
const mongoose = require('./db.js');

var app = express();
app.use(bodyparser.json());
app.use(cors({ origin: 'http://localhost:4200'}));

app.listen(3001, () => console.log('server listing 3001'))
app.use('/person', Personcontroller);