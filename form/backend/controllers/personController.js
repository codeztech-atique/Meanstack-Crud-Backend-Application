const express = require('express')
var router = express.Router()

var { Person } = require('../model/person.js')
var ObjectId = require('mongoose').Types.ObjectId

//localhost:300/person
router.get('/',(req,res) =>{
    Person.find((err,doc) =>{
        if(!err){res.send(doc)}
        else { console.log('Error in retrieving persons' + JSON.stringify(err, undefined, 2)); }
    })
})

router.get('/:id',(req,res) => {
     if(!ObjectId.isValid(req.params.id))
     return res.status(400).send('No record with given id: $(req.params.id)');

     Person.findById(req.params.id, (err, docs) => {
         if(!err){res.send(docs)}
         else{ console.log("Erroe in retrieving people:" + JSON.stringify(err, undefined, 2)) }
        });
})

router.post('/',(req,res) => {
    var per = new Person({
        name : req.body.name,
        mail : req.body.mail,
        class : req.body.class
    });
    per.save((err, doc) => {
        if(!err){res.send(doc)}
        else { console.log('Error in retrieving persons' + JSON.stringify(err, undefined, 2)); }
    });
})
router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send('No record with given id: $(req.params.id)');

     var per = new Person({
        name : req.body.name,
        mail : req.body.mail,
        class : req.body.class
    });
    Person.findByIdAndUpdate(req.params.id,{ $set : per },{ new : true }, (err,docs) => {
        if(!err){ res.send(docs); }
        else { console.log("Error in person updation" + JSON.stringify(err, undefined, 2)); }
    });
})

router.delete('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send('No record with given id: $(req.params.id)');
     
    Person.findByIdAndRemove(req.params.id, (err,docs) => {
        if(!err){ res.send(docs); }
        else { console.log("Error in person updation" + JSON.stringify(err, undefined, 2)); }
    });
})

module.exports = router