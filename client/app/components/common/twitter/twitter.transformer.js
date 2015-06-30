(function () {
	'use strict';

	angular.module('twikki')
		.factory('TwitterTransformer', ['TwitterService', '$q', function (TwitterService, $q) {

			var addText = function (feed, status) {
				feed.text = status.text;
			};

			var addUser = function (feed, user) {
				feed.user = {
					name: user.name,
					username: user.screen_name,
					profileImage: user.profile_image_url
				}
			};

			var getFeed = function () {

				return $q(function (resolve, reject) {

					TwitterService.getFeed().success(function (data) {

						var feeds = buildFeed(data.tweets.statuses);

						resolve(feeds);
					});

				});
			};

			var buildFeed = function (data) {
				var feeds = [];

				for (var i = 0; i < data.length; i++) {
					var feed = {};
					var status = data[i];

					addText(feed, status);
					addUser(feed, status.user);

					feeds.push(feed);
				}

				return feeds;
			};

			return {
				buildFeed: buildFeed,
				getFeed: getFeed
			}

		}]);
})();