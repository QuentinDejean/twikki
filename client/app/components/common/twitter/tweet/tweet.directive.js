(function () {
    'use strict';

	angular.module('twikki')
		.directive('tweet', function () {
			return {
				replace: true,
				templateUrl: '/app/components/common/twitter/tweet/tweet.html',
				scope: {
					description: '=description'
				}
			}
		})
})();