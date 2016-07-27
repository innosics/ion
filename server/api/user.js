var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/space', passport.authenticate('bearer', { session: false }),
    function(req, res) {
        var q = {username: req.user.username};

        var apiDB = req.apiDB;
        var db = apiDB.db("accounts");

        db.collection( "spaces", function(err, collection) {
            collection.findOne(q,function(err, result) {
                if (result){
                    res.send(result);
                } else {
                    res.send({error: 'no record found'});
                }
            });
        });
    }
);

module.exports = router;