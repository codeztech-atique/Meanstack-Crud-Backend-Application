const mongoose = require('mongoose');

var Person = mongoose.model('Person',{
    name:{type : String},
    mail:{type : String},
    class:{type : Number}
})
 module.exports = {Person}