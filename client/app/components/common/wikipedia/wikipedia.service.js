(function () {
    'use strict';

	angular.module('twikki')
		.factory('WikipediaService', [ '$http', function ($http) {

			var root = 'https://en.wikipedia.org/w/api.php';


			var getDefinition = function (params) {
				params.callback = 'JSON_CALLBACK';
				return $http.jsonp(root, {params: params});
			};

			return {
				getDefinition: getDefinition
			}

		}]);
})();