var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {

    res.render('index');

});

// router.get('/message', function (req, res, next) {
//     res.render('index');
// });

// router.post('/', function (req, res, next) {
//     var email = req.body.email;
//     var user = new User({
//         firstName: 'supeng',
//         lastName: 'steve',
//         password: 'supersecret',
//         email: email
//     });
//     user.save();
//     res.redirect('/');
// });



module.exports = router;
