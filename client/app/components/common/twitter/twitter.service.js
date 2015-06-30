(function () {
	'use strict';

	angular.module('twikki')
		.factory('TwitterService', ['$http', 'serverUrl', '$rootScope', 'mapping',
			function ($http, serverUrl, $rootScope, mapping) {

			var twitterBaseUrl = serverUrl + '/twitter';
			var socket = io.connect(serverUrl);

			var getFeed = function () {
				return $http.get(twitterBaseUrl + '/feed');
			};

			var getStreamFeed = (function () {
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