const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/firstdb',(err) => {
    if(!err){
        console.log('MongoDB connected...')
    } else
    {
        console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2) );
    }
})

module.exports = mongoose