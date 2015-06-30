(function () {
	'use strict';

	angular.module('twikki', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])
		.constant('mapping' , {
			page: {},
			service: {},
			event: {
				tweet: 'tweet'
			}
		});
})();