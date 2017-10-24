const express = require('express');
var AWS = require('aws-sdk');

const router = express.Router();

router.post('/', function (req, res) {

    AWS.config.update({ accessKeyId: res.locals.AMAZON_KEY, secretAccessKey: res.locals.AMAZON_SECRET });

    let fileUrls = [];

    Promise.all(req.body.files.map(function (file) {
        var buf = new Buffer(file.data_uri.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        var s3 = new AWS.S3();
        return s3.upload({
            Bucket: 'graceshopper',
            Key: file.filename,
            Body: buf,
            ACL: 'public-read'
        }).promise()
            .then(data => fileUrls.push(data.Location))
    }))
        .then(() => {
            res.send({
                status: 'success',
                fileUrls
            });
        })
});

module.exports = router;
