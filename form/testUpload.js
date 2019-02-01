const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_Access_keyID,
    secretAccessKey: process.env.AWS_Secreat_access_keyID
});

var filename =  'abc.json';

const uploadFile = () => {
    fs.readFile(filename, (err, data) => {
       if(err) return err;
       const params =  {
           Bucket: 'testBucketName',
           Key: 'abc.json',
           Body: JSON.stringify(data, null, 2)
       }
       s3.upload(params, (err, data) => {
           if(err) throw err
           console.log('FileUpload Successfully');
       });
    });
}

uploadFile();