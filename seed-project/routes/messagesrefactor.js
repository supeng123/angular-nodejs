var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/message');
var jwt = require('jsonwebtoken');
var common = require('./common');

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        common.withFiveHundredError(res, err, 'Not Authenticated');
        next();
    })
});

router.get('/', function(req, res, next){
    Message.find()
        .exec(function(err, messages){
            common.withFiveHundredError(res, err);
            common.twohundredResponds(res, messages)
        });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        common.withFiveHundredError(res, err);
        var message = new Message({
            content: req.body.content,
            user: user //将 user保存到message的schema中
        });
        message.save(function (err, result) {
            common.withFiveHundredError(res, err);
            user.message.push(result);//将 message保存到user的schema中
            user.save();
            common.twohundredResponds(res, result, 'Saved Message')
        })
    });
});

router.patch('/:id', function (req, res, next) {
    Message.findById(req.params.id, function (err, message) {
        common.withFiveHundredError(res, err);
        if (!message) {
            var error = {message: 'Message not found'};
            common.fiveHundredErrorResponds(res, error, 'No message found');
        }
        message.content = req.body.content;
        message.save(function (err , result) {
            common.withFiveHundredError(res, err);
            common.twohundredResponds(res, result, 'updated Message')
        });
    })
});

router.delete('/:id', function (req ,res, next) {
    Message.findById(req.params.id, function (err, message) {
        common.withFiveHundredError(res, err);
        if (!message) {
            var error = {message: 'Message not found'};
            common.fiveHundredErrorResponds(res, error, 'no message found');
        }
        message.remove(function (err, result) {
            common.withFiveHundredError(res, err);
            common.twohundredResponds(res, result, 'deleted Message')
        });
    });
});

module.exports = router;
