var mongoose = require('mongoose');

mongoose.connect('mongodb://' +
    process.env.OPENSHIFT_MONGODB_DB_USERNAME +
    ':' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD +
    '@' + process.env.OPENSHIFT_MONGODB_DB_HOST +
    ':' + process.env.OPENSHIFT_MONGODB_DB_PORT +
    '/accounts?authSource=admin');

var db = mongoose.connection;

db.on('error', function (err) {
	console.log('mongoose connection error: ' + err.message);
});

db.once('open', function callback () {
	console.log("mongoose connected!");
});

module.exports = mongoose;
