(function () {
	'use strict';

	angular.module('twikki')
		.directive('highlightedText', ['$document', '$window', '$rootScope', 'mapping', '$compile', 'WikipediaBuilder',
			function ($document, $window, $rootScope, mapping, $compile, WikipediaBuilder) {
				return {
					link: function (scope) {

						var container;

						$document.bind('mouseup', function () {
							var selection = $window.getSelection();

							if (!selection.toString()) {
								//trigger the hiding of the tooltip
								//container.setAttribute('popover-enable', 'false');
								return;
							}

							var range = selection.getRangeAt(0);
							var rect = range.getBoundingClientRect();

							scope.definition = 'Loading...';
							container.style.display = 'inline';
							container.style.top = rect.top + 'px';
							container.style.left = rect.left + 'px';
							container.style.height = rect.height + 'px';
							container.style.width = rect.width + 'px';

							angular.element(container).triggerHandler('click');

							getDefinition(selection.toString());

						});


						var createTooltip = function () {
							container = document.createElement('div');
							container.setAttribute('popover', '{{ definition }}');
							container.setAttribute('popover-placement', 'top');
							container.setAttribute('popover-trigger', 'click');
							container.style.position = 'fixed';
							container.style.display = 'none';

							$compile(angular.element(container))(scope);

							$document[0].body.appendChild(container);
						};


						var getDefinition = function (word) {
							WikipediaBuilder.buildDefinition(word).then(function (definition) {
								scope.definition = definition.extract ? definition.extract : 'No definition is available for this word';
							});
						};


						createTooltip();

					}
				}
			}]);
})();