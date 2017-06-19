var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/message');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var DIR = './uploads/';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});
var upload = multer({storage: storage}).single('photo');

router.get('/', function(req, res, next){
    Message.find()
        .populate('user', 'firstName')
        .exec(function(err, messages){
            if (err) {
                return res.status(500).json({
                    title:'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });
});


router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if(err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});


router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err){
            return res.status(500).json({
                title:'An error occured',
                error: err
            });
        }

        var message = new Message({
            content: req.body.content,
            user: user //将 user保存到message的schema中
        });
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title:'An error occured',
                    error: err
                });
            }

            user.messages.push(result);//将 message保存到user的schema中
            user.save();

            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        })
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title:'An error occured',
                error: err
            });
        }

        if (!message) {
            return res.status(500).json({
                title:'no message found',
                error: {message: 'Message not found'}
            });
        }
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        message.content = req.body.content;
        message.save(function (err , result) {
            if (err) {
                return res.status(500).json({
                    title:'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'updated message',
                obj: result
            });
        });
    })
});

router.delete('/:id', function (req ,res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        if (!message) {
            return res.status(500).json({
                title: 'no message found',
                error: {message: 'Message not found'}
            });
        }

        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }

        message.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title:'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'deleted message',
                obj: result
            });
        });
    });
});

router.post('/upload', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        // No error occured.
        console.log(req.file);
        return res.send("Upload Completed for "+path);
    });
});


module.exports = router;
