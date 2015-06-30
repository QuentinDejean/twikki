(function () {
    'use strict';

	angular.module('twikki')
		.factory('WikipediaService', [ '$http', function ($http) {

			var root = 'https://en.wikipedia.org/w/api.php';


			var getDefinition = function (successHandler, errorHandler, params) {
				params.callback = 'JSON_CALLBACK';
				$http.jsonp(root, {params: params})
					.success(function (data) {
						successHandler(data);
					}).error(function (error) {
						errorHandler(error);
					});
			};

			return {
				getDefinition: getDefinition
			}

		}]);
})();