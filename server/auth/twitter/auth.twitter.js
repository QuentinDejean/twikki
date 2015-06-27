exports.setup = function () {
	var passport = require('passport'),
		TwitterStrategy = require('passport-twitter').Strategy;

	var TWITTER_CONSUMER_KEY = "QwdAUzSbGjv1C5sI8ZTuIr05x";
	var TWITTER_CONSUMER_SECRET = "Ay45eQdOxNE19SNCetm9aUlHXpsjrMUXQZNSAij3CE35Koo9Dw";


	passport.use(new TwitterStrategy({
			consumerKey: TWITTER_CONSUMER_KEY,
			consumerSecret: TWITTER_CONSUMER_SECRET,
			callbackURL: "http://localhost:3000/auth/twitter/callback"
		},
		function(token, tokenSecret, profile, done) {
			done();
		}
	));
};

