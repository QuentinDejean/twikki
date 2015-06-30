
var TwitterStream = require('node-tweet-stream');
var twitterConf = require('../../config/config').twitter;

var clientStream = new TwitterStream({
	consumer_key: twitterConf.consumer_key,
	consumer_secret: twitterConf.consumer_secret,
	token: twitterConf.access_token_key,
	token_secret: twitterConf.access_token_secret
});

module.exports = function (io) {
	clientStream.on('tweet', function (tweet) {
		io.emit('tweet', tweet);
	});

	clientStream.on('error', function (err) {
		console.log('Oh no')
	});

	clientStream.track('nodejs');
};

