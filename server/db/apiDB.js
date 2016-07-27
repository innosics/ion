
var mongodb = require('mongodb');

var mongoserver = new mongodb.Server(process.env.OPENSHIFT_MONGODB_DB_HOST, process.env.OPENSHIFT_MONGODB_DB_PORT, {auto_reconnect: false, poolSize: 4})
var apiDB = new mongodb.Db('test', mongoserver, {w:0, native_parser: false});

apiDB.open(function(err, db){
	if (err) throw err;

	var adminDb = db.admin();
	adminDb.authenticate(process.env.OPENSHIFT_MONGODB_DB_USERNAME, process.env.OPENSHIFT_MONGODB_DB_PASSWORD, function(err, result) {
	    if (! err){
			console.log("apiDB connected to mongo!");
		}else{
			console.log(err);
		}
	});
});

module.exports = apiDB;
