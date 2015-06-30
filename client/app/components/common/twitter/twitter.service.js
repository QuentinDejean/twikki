(function () {
	'use strict';

	angular.module('twikki')
		.factory('TwitterService', ['$http', 'serverUrl', '$rootScope', 'mapping',
			function ($http, serverUrl, $rootScope, mapping) {

			var twitterBaseUrl = serverUrl + '/twitter';
			var socket = io.connect("http://localhost:3000");

			var getFeed = function (successHandler, errorHandler) {
				$http.get(twitterBaseUrl + '/feed')
					.success(function (data) {
						successHandler(data);
					})
					.error(function (error) {
						errorHandler(error);
					});
			};

			var getStreamFeed = (function () {

				console.log('listening for tweets!');

				socket.on('tweet', function (tweet) {
					$rootScope.$broadcast(mapping.event.tweet, tweet);
				});

			})();

			return {
				getFeed: getFeed,
				getStreamFeed: getStreamFeed
			}


		}])
})();