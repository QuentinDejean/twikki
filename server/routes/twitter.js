var express = require('express');
var router = express.Router();

var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: 'QwdAUzSbGjv1C5sI8ZTuIr05x',
	consumer_secret: 'Ay45eQdOxNE19SNCetm9aUlHXpsjrMUXQZNSAij3CE35Koo9Dw',
	access_token_key: '282461932-GdIiyIInE8u2Ms0LNjgcDR7MYN8X0D21P6a5Hh1u',
	access_token_secret: '9gWKusXTlWHsvjw2Ao4wzuzZpb2GftROC6wgsIUBCP98D'
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

