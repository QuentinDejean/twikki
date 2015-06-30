(function () {
	'use strict';

	angular.module('twikki')
		.config(['$tooltipProvider', function ($tooltipProvider) {
			$tooltipProvider.setTriggers({'openTrigger': 'closeTrigger'});
		}])
		.directive('highlightedText', ['$document', '$window', 'WikipediaTransformer', '$timeout', 'mapping',
			function ($document, $window, WikipediaTransformer, $timeout, mapping) {
				return {
					replace: true,
					template: ['<div popover="{{ popover.definition }}"',
						'popover-append-to-body popover-title="{{ popover.title }}"',
						'popover-placement="{{ popover.placement }}"',
						'popover-trigger="openTrigger"></div>'].join(''),
					link: function (scope, elem) {

						var isVisible;
						scope.popover = {};

						scope.$on(mapping.event.repaint, function () {
							repaintTooltip();
						});

						$document.bind('mouseup', function () {
							var selection = $window.getSelection();

							if (!selection.toString().trim()) {
								if (isVisible) {
									isVisible = false;
									hideTooltip();
								}
								return;
							}

							var range = selection.getRangeAt(0);
							var rect = range.getBoundingClientRect();

							scope.popover.definition = 'Loading...';
							scope.popover.title = selection.toString();

							displayTooltip(rect);

							getDefinition(selection.toString());
						});

						var displayTooltip = function (rect) {
							elem.css({
								top: rect.top + 'px',
								left: rect.left + 'px',
								height: rect.height + 'px',
								width: rect.width + 'px'
							});

							scope.$digest();
							elem.triggerHandler('openTrigger');
							scope.$apply();

							isVisible = true;
						};

						var getDefinition = function (word) {
							WikipediaTransformer.buildDefinition(word).then(function (definition) {
								scope.popover.definition = definition.extract ? definition.extract : 'No definition is available for this word';
								scope.popover.placement = elem.css('top') <= '200px' ? 'bottom' : 'top';
							});
						};

						var hideTooltip = function () {
							elem.triggerHandler('closeTrigger').css({
								height: 0
							});

							isVisible = false;
						};

						var paintTooltip = function () {
							elem.css({
								position: 'fixed'
							});
						};


						var repaintTooltip = function () {
							hideTooltip();

							$timeout(function () {
								var selection = $window.getSelection();

								if (selection.toString()) {

									var range = selection.getRangeAt(0);
									var rect = range.getBoundingClientRect();

									displayTooltip(rect);
								}
							}, 500);
						};


						paintTooltip();
					}
				}
			}]);
})();