var express = require('express');
var passport = require('passport');
var router = express.Router();

var userService = require('../auth/auth.service');

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
router.get('/twitter', passport.authenticate('twitter'));
//function (req, res, next) {
//	if (!userService.isLoggedIn()) {
//		passport.authenticate('twitter');
//	} else {
//		res.redirect('/');
//	}
//});

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/twitter/callback',
	passport.authenticate('twitter', { successRedirect: '/users',
		failureRedirect: '/' }));

module.exports = router;
