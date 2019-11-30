const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('./db.js');
const personController = require('./controllers/personController.js')

 var app = express();
 app.use(bodyParser.json());
 app.use(cors({ origin : 'http://localhost:4200' }));

 app.listen(3000, () => console.log('Server connected to port: 3000'))

 app.use('/person',personController)