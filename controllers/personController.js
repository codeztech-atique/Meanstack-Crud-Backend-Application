const express = require('express')
var router = express.Router()

var { Person } = require('../model/person.js')
var ObjectId = require('mongoose').Types.ObjectId

router.get('/',(req,res) =>{
    Person.find((err,doc) =>{
        if(!err){res.send(doc)}
        else { console.log('Error in retrieving persons' + JSON.stringify(err, undefined, 2)); }
    })
})


router.post('/',(req,res) => {
    var per = new Person({
        name : req.body.name,
        mail : req.body.mail,
        class : req.body.class
    });
    Person.findOne({'mail':req.body.mail}, (err, docs) => {
        if(!docs) {
            per.save((err, doc) => {
                if(!err){
                    res.status(200).send({ auth: true, doc, message:"1 documents inserted!" });
                }
                else { console.log('Error in user inserting data' + JSON.stringify(err, undefined, 2)); }
            });
        }
        else { 
            console.log("User data already exists:"+req.body.mail);
            res.status(400).send({
                message: 'User data already exists:'+req.body.mail
            }) 
        }
    })
})
router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send('No record with given id: $(req.params.id)');

     var per = {
        $set: {
            name : req.body.name,
            mail : req.body.mail,
            class : req.body.class
        }
    };
    Person.findOneAndUpdate({mail: req.body.mail}, per, {new: true, useFindAndModify: false}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        } else if(doc) {
            res.status(200).send({
                auth: true,
                message:"1 document updated"
            })
        } else {
            res.status(404).send({
                message:"Resource not found, please register first with the email id!!"
            })
        }
        console.log(doc);
    });
})

router.delete('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send('No record with given id: $(req.params.id)');
     
    Person.findByIdAndRemove(req.params.id, {new: true, useFindAndModify: false}, (err,docs) => {
        if(!err){ res.send(docs); }
        else { console.log("Error in person updation" + JSON.stringify(err, undefined, 2)); }
    });
})

module.exports = router