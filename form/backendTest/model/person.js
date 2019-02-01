const mongoose = require('mongoose');

var person = mongoose.model('person', {
  name:{type: string},
  class:{type: number},
  email:{type: string}
});

module.exports = {person};
   
