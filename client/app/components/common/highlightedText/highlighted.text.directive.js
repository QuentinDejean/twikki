(function () {
	'use strict';

	angular.module('twikki')
		.config(['$tooltipProvider', function ($tooltipProvider) {
			$tooltipProvider.setTriggers({'openTrigger': 'closeTrigger'});
		}])
		.directive('highlightedText', ['$document', '$window', '$rootScope', 'mapping', '$compile', 'WikipediaBuilder',
			function ($document, $window, $rootScope, mapping, $compile, WikipediaBuilder) {
				return {
					scope: {},
					replace: true,
					template: '<div popover="{{ definition }}" popover-placement="top" popover-trigger="openTrigger"></div>',
					link: function (scope, elem, attrs) {

						var isVisible;

						$document.bind('mouseup', function () {
							var selection = $window.getSelection();

							if (!selection.toString()) {
								if (isVisible) {
									isVisible = false;
									hideTooltip();
								}
								return;
							}

							var range = selection.getRangeAt(0);
							var rect = range.getBoundingClientRect();

							scope.definition = 'Loading...';

							displayTooltip(rect);

							getDefinition(selection.toString());
						});


						var createTooltip = function () {
							elem.css({
								position: 'fixed'
							});
						};


						var displayTooltip = function (rect) {
							elem.css({
								top: rect.top + 'px',
								left: rect.left + 'px',
								height: rect.height + 'px',
								width: rect.width + 'px'
							}).triggerHandler('openTrigger');

							isVisible = true;
						};

						var getDefinition = function (word) {
							WikipediaBuilder.buildDefinition(word).then(function (definition) {
								scope.definition = definition.extract ? definition.extract : 'No definition is available for this word';
							});
						};

						var hideTooltip = function () {
							elem.css({
								height: 0
							}).triggerHandler('closeTrigger');

							isVisible = false;
						};


						createTooltip();
					}
				}
			}]);
})();