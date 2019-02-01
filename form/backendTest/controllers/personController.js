const express = require('express');
var router  = express.Router();

var {person} = require('../model/person.js');
var objectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
   person.find((err, doc) => {
       if(!err) {
           res.send(doc);
       }
   })
});

router.get('/:id', (req, res) => {
    if(!objectId.isValid(req.params.id)) 
      return res.send({
          message: 'objectid not valid!'
      })
    person.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc)
        }
    })
})

router.post('/', (req, res)=> {
    var per = new person({
        name: req.body.name,
        class: req.body.class,
        email: req.body.email
    })
    per.save((err, doc) => {
       if(!err) {
           res.send(doc);
       }
    })
})

module.exports = router;