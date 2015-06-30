(function () {
	'use strict';

	angular.module('twikki', ['ngRoute', 'ui.bootstrap'])
		.constant('mapping' , {
			page: {},
			service: {},
			event: {
				tooltip: 'tooltip'
			}
		});
})();