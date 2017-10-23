const express = require('express');
var AWS = require('aws-sdk');

const router = express.Router();

router.post('/', function (req, res) {

    AWS.config.update({ accessKeyId: res.locals.AMAZON_KEY, secretAccessKey: res.locals.AMAZON_SECRET });

    var buf = new Buffer(req.body.data_uri.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    var s3 = new AWS.S3();
    var image = s3.upload({
        Bucket: 'graceshopper',
        Key: req.body.filename,
        Body: buf,
        ACL: 'public-read'
    }, function (err, data) {
        res.send({
            status: 'success',
            uri: data.Location
        });
    });
});

module.exports = router;
