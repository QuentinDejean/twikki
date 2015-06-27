(function () {
    'use strict';

	angular.module('twikki')
		.config(['$routeProvider', 'Mapping', function ($routeProvider, Mapping) {
			console.log(Mapping);
			Mapping.page.home = '/';

			$routeProvider.when(Mapping.page.home, {
				templateUrl: '/app/components/home/home.html',
				controller: 'HomeController',
				controllerAs: 'homeCtrl'
			})
			.otherwise({redirectTo: Mapping.page.home})
		}])
})();