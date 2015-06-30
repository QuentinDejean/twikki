var express = require('express');
var router = express.Router();
var config = require('../config/config');
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: config.twitter.consumer_key,
	consumer_secret: config.twitter.consumer_secret,
	access_token_key: config.twitter.access_token_key,
	access_token_secret: config.twitter.access_token_secret
});

var params = {q: 'nodejs'};

router.get('/feed', function (req, res) {
	client.get('search/tweets.json', params, function (error, tweets) {
		if (!error) {
			res.json({tweets: tweets});
		}
	});
});

module.exports = router;

