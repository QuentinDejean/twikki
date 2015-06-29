'use strict';

var userService = (function () {
	var user;

	var isLoggedIn = function () {
		return user;
	};

	var authenticate = function (token, tokenSecret) {
		user = {
			token: token,
			tokenSecret: tokenSecret
		}
	};

	return {
		isLoggedIn: isLoggedIn,
		authenticate: authenticate
	}

})();

module.exports = userService;
