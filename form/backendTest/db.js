const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/firstDb', (err) => {
  if(!err) {
      console.log('Mongodb Connected!');
  } else {
      console.log('Mongodb not Connected!');
  }
});

module.exports = mongoose;