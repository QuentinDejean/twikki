(function () {
    'use strict';

	angular.module('twikki')
		.config(['$routeProvider', 'mapping', function ($routeProvider, mapping) {
			mapping.page.home = '/';

			$routeProvider.when(mapping.page.home, {
				templateUrl: '/app/components/home/home.html',
				controller: 'HomeController',
				controllerAs: 'homeCtrl'
			})
			.otherwise({redirectTo: mapping.page.home})
		}])
})();