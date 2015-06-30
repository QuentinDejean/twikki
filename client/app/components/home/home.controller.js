(function () {
    'use strict';

	angular.module('twikki')
		.controller('HomeController', ['TwitterBuilder', '$scope', function (TwitterBuilder, $scope) {

			var init = function () {
				TwitterBuilder.buildFeed().then(function (tweets) {
					$scope.tweets = tweets;
				});
			};

			init();
		}]);
})();