/*
Author: Rosy Yang <rosy.yang@gmail.com> | MIT Licensed
*/
const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      express = require('express'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      env          = process.env,
      root = process.cwd(),
      apiDB = require('./db/apiDB'),
      dataApi = require('./api/data'),
      accountApi = require('./api/user'),
      mongoose = require('./db/mongoose'),
      auth = require('./auth/auth'),
      oauth2 = require('./auth/oauth2'),
      authweb = require('./auth/authweb')
;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.static(root + '/web'));

app.use(function(req, res, next) {
	req.apiDB = apiDB;
	next();
});

app.use('/api/data', dataApi);
app.use('/api/oauth/token', oauth2.token);
app.use('/auth/token', authweb);
app.use('/account', accountApi);

let server = http.createServer(app);

server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Innosics API worker ${process.pid} started...`);
});
