(function () {
	'use strict';

	angular.module('twikki')
		.controller('HomeController', ['TwitterTransformer', '$scope', 'mapping', '$rootScope',
			function (TwitterTransformer, $scope, mapping, $rootScope) {

			$scope.tweets = [];

			var init = function () {
				TwitterTransformer.getFeed().then(function (tweets) {
					$scope.tweets = $scope.tweets.concat(tweets);
				});
			};

			$scope.$on(mapping.event.tweet, function (event, data) {
				$scope.$apply(function () {
					$scope.tweets.unshift(TwitterTransformer.buildFeed([data])[0]);

					if ($scope.size > 50) {
						$scope.tweets.pop();
					}

				});

				$rootScope.$emit(mapping.event.repaint);
			});

			init();
		}]);
})();