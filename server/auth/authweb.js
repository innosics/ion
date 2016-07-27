var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res) {

	var grant_type = req.query.grant_type;
	var username = req.query.username;
	var password = req.query.password;
	var refresh_token = req.query.refresh_token;

	var data = undefined;
	if (grant_type == "password"){
		data =
		{
			"grant_type":"password",
			"client_id":process.env.client_id,
			"client_secret":process.env.client_secret,
			"username":username,
			"password":password
		}
	}else if (grant_type.equals("refresh_token")){
		data =
		{
		  "grant_type": "refresh_token",
		  "refresh_token": refresh_token,
		  "client_id": process.env.client_id,
		  "client_secret":process.env.client_secret
		}
	}

	request.post(
		'http://' + (process.env.NODE_IP || 'localhost') + ':' + (process.env.NODE_PORT || 3000) + '/oauth/token',
		{ form: data },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.json(JSON.parse(body));
			}
		}
	);
});

router.post('/', function (req, res) {

	var authData = req.body;

	var data = undefined;
	if (authData.grant_type == "password"){
		data =
		{
			"grant_type":"password",
			"client_id":process.env.client_id,
			"client_secret":process.env.client_secret,
			"username":authData.username,
			"password":authData.password
		}
	}else if (authData.grant_type == "refresh_token" && authData.refresh_token != undefined){
		data =
		{
		  "grant_type": "refresh_token",
		  "refresh_token": authData.refresh_token,
		  "client_id": process.env.client_id,
		  "client_secret":process.env.client_secret
		}
	}
    console.log(data);
    if (!data) {
        console.log("Error: no valid auth data...");
        res.json({error: "invalid_token"});
        return;
    }
	request.post(
		'http://' + (process.env.NODE_IP || 'localhost') + ':' + (process.env.NODE_PORT || 3000) + '/api/oauth/token',
		{ form: data },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.json(JSON.parse(body));
			}else{
                console.log("auth failed...");
                res.json({error: "unauthorized"});
            }
		}
	);
});

module.exports = router;
