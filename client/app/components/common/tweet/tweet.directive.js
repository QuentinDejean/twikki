(function () {
    'use strict';

	angular.module('twikki')
		.directive('tweet', function () {
			return {
				replace: true,
				templateUrl: '/app/components/common/tweet/tweet.html',
				scope: {
					description: '=description'
				}
			}
		})
})();