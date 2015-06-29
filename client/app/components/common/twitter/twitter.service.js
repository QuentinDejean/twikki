(function () {
	'use strict';

	angular.module('twikki')
		.factory('TwitterService', ['$http', 'serverUrl', function ($http, serverUrl) {

			var twitterBaseUrl = serverUrl + '/twitter';

			var getFeed = function (successHandler, errorHandler) {
				$http.get(twitterBaseUrl + '/feed')
					.success(function (data) {
						successHandler(data);
					})
					.error(function (error) {
						errorHandler(error);
					});
			};

			return {
				getFeed: getFeed
			}


		}])
})();