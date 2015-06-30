(function () {
	'use strict';

	angular.module('twikki')
		.config(['$tooltipProvider', function ($tooltipProvider) {
			$tooltipProvider.setTriggers({'openTrigger': 'closeTrigger'});
		}])
		.directive('highlightedText', ['$document', '$window', '$rootScope', 'mapping', '$compile', 'WikipediaBuilder',
			function ($document, $window, $rootScope, mapping, $compile, WikipediaBuilder) {
				return {
					//template: '<popover="{{ definition }}" ',
					link: function (scope) {

						var container, isVisible;

						$document.bind('mouseup', function () {
							var selection = $window.getSelection();

							if (!selection.toString()) {
								//trigger the hiding of the tooltip
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
							container = document.createElement('div');

							angular.element(container)
								.attr('popover', '{{ definition }}')
								.attr('popover-placement', 'top')
								.attr('popover-trigger', 'openTrigger')
								.css({
									position: 'fixed'
								});

							$compile(angular.element(container))(scope);

							$document[0].body.appendChild(container);
						};


						var displayTooltip = function (rect) {
							console.log('displaying!!');
							angular.element(container)
								.css({
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
							console.log("hiding!!");
							angular.element(container).css({
									height: 0
								}).triggerHandler('closeTrigger');

							isVisible = false;
						};


						createTooltip();
					}
				}
			}]);
})();