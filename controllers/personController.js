const express = require('express');
const router = express.Router();

const { Person } = require('../model/person.js');
const { ObjectId } = require('mongoose').Types;

// GET /person - list all persons
router.get('/', async (req, res) => {
  try {
    const docs = await Person.find();
    res.status(200).send(docs);
  } catch (err) {
    console.error('Error in retrieving persons:', err);
    res.status(500).send({ message: 'Error in retrieving persons' });
  }
});

// POST /person - create a person (mail must be unique)
router.post('/', async (req, res) => {
  try {
    const existing = await Person.findOne({ mail: req.body.mail });
    if (existing) {
      console.log('User data already exists:', req.body.mail);
      return res.status(400).send({
        message: `User data already exists: ${req.body.mail}`,
      });
    }

    const doc = await Person.create({
      name: req.body.name,
      mail: req.body.mail,
      class: req.body.class,
    });

    res.status(200).send({ auth: true, doc, message: '1 documents inserted!' });
  } catch (err) {
    console.error('Error in user inserting data:', err);
    res.status(500).send({ message: 'Error in inserting data' });
  }
});

// PUT /person/:id - update a person by mail
router.put('/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  }

  try {
    const update = {
      $set: {
        name: req.body.name,
        mail: req.body.mail,
        class: req.body.class,
      },
    };

    const doc = await Person.findOneAndUpdate({ mail: req.body.mail }, update, {
      new: true,
    });

    if (!doc) {
      return res.status(404).send({
        message: 'Resource not found, please register first with the email id!!',
      });
    }

    res.status(200).send({ auth: true, message: '1 document updated' });
  } catch (err) {
    console.error('Something wrong when updating data!', err);
    res.status(500).send({ message: 'Error in updating data' });
  }
});

// DELETE /person/:id - delete a person by id
router.delete('/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  }

  try {
    const doc = await Person.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).send({ message: 'No record found with given id' });
    }
    res.status(200).send(doc);
  } catch (err) {
    console.error('Error in person deletion:', err);
    res.status(500).send({ message: 'Error in deleting data' });
  }
});

module.exports = router;
