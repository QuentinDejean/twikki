(function () {
    'use strict';

	angular.module('twikki')
		.factory('WikipediaBuilder', [ 'WikipediaService', '$q', function (WikipediaService, $q) {

			var buildDefinition = function (title) {
				return $q(function (resolve, reject) {
					var definition;

					var params = {
						action: 'query',
						format: 'json',
						prop: 'extracts',
						exintro: false,
						explaintext:true,
						titles: title,
						exchars: 300
					};

					WikipediaService.getDefinition(function (data) {
						definition = {};

						var pages = toArray(data.query.pages);
						addExtract(definition, pages[0]);

						resolve(definition);
					}, function (error) {
						reject(error);
					}, params);
				});
			};


			var addExtract = function (definition, page) {

				if (page.extract !== "...") {
					definition.extract = page.extract;
				}

			};

			var toArray = function (pages) {
				var pageList = [];
				for (var i in pages) {
					if (pages.hasOwnProperty(i)) {
						pageList.push(pages[i]);
					}
				}

				return pageList;

			};

			return {
				buildDefinition: buildDefinition
			}

		}]);
})();