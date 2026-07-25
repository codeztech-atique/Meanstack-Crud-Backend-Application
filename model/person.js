const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String },
  mail: { type: String },
  class: { type: Number },
});

const Person = mongoose.models.Person || mongoose.model('Person', personSchema);

module.exports = { Person };
