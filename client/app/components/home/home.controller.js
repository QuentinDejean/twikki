(function () {
    'use strict';

	angular.module('twikki')
		.controller('HomeController', ['TwitterBuilder', '$scope', 'mapping', function (TwitterBuilder, $scope, mapping) {

			$scope.tweets = [];

			var init = function () {
				TwitterBuilder.getFeed().then(function (tweets) {
					$scope.tweets = $scope.tweets.concat(tweets);
				});
			};

			$scope.$on(mapping.event.tweet, function (event, data) {
				$scope.$apply(function () {
					$scope.tweets.unshift(TwitterBuilder.buildFeed([data])[0]);
				});
			});

			init();
		}]);
})();