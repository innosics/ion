var express = require('express');
var passport = require('passport');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;

/* GET data by _id */
router.get('/fetch/:dbName/:collName/:_id', passport.authenticate('bearer', { session: false }), function (req, res) {

    var dbName = req.params.dbName;

    var collName = req.params.collName;

    var _id = req.params._id;

    var q = {_id: new ObjectID(_id)};

    var apiDB = req.apiDB;
    var db = apiDB.db(dbName);

    db.collection( collName, function(err, collection) {
	    collection.findOne(q,function(err, result) {
            if (result){
                res.send(result);
            } else {
                res.send({error: 'no record found'});
            }
	    });
    });
});

/* GET data listing. */
router.get('/list/:dbName/:collName', passport.authenticate('bearer', { session: false }), function (req, res) {

    var dbName = req.params.dbName;

    var collName = req.params.collName;

    var q = {status: {$ne: "Deleted"}};
    for (var propName in req.query) {
        if (req.query.hasOwnProperty(propName)) {
            var value = req.query[propName];
            if (isNaN(value)){
            }else{
                value = parseInt(value);
            }
            q[propName] = value;
        }
    }

    var apiDB = req.apiDB;
    var db = apiDB.db(dbName);

    db.collection( collName, function(err, collection) {
        collection.find(q).toArray(function(err, items) {
            res.send(items);
        });
    });

});

/* list data by post query. */
router.post('/list/:dbName/:collName', passport.authenticate('bearer', { session: false }), function (req, res) {

    var dbName = req.params.dbName;

    var collName = req.params.collName;

    var q = req.body;

    var apiDB = req.apiDB;
    var db = apiDB.db(dbName);

    db.collection( collName, function(err, collection) {
        collection.find(q).toArray(function(err, items) {
            res.send(items);
        });
    });

});


/*save data*/
router.post('/save/:dbName/:collName', passport.authenticate('bearer', { session: false }), function (req, res) {

    var dbName = req.params.dbName;

    var collName = req.params.collName;

    var obj = req.body;
    var _id = obj._id;

    var apiDB = req.apiDB;
    var db = apiDB.db(dbName);

    db.collection( collName, function(err, collection) {

	    if (_id){
		//update
		delete obj._id;
                var q = {_id: new ObjectID(_id)};
		    collection.updateOne(q, {'$set': obj},function(err, responseData){
                return res.json({
                    status: 'OK',
                    data: responseData
                });

		    });
	    }else{
		//insert
		    collection.insert(obj,function(err, responseData){
                return res.json({
                    status: 'OK',
                    data: responseData
                });

		    });
	    }
    });

});

/* delete data. */
router.get('/delete/:dbName/:collName/:_id', passport.authenticate('bearer', { session: false }), function (req, res) {

    var dbName = req.params.dbName;

    var collName = req.params.collName;

    var _id = req.params._id;

    var q = {_id: new ObjectID(_id)};

    var apiDB = req.apiDB;
    var db = apiDB.db(dbName);

    db.collection( collName, function(err, collection) {
	    collection.deleteOne(q,function(err, result) {
		if (result){
		    res.send(result);
		} else {
		    res.send({error: 'no data to be deleted'});
		}
	    });
    });

});

module.exports = router;
