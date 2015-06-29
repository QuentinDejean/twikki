(function () {
    'use strict';

	angular.module('twikki')
		.factory('TwitterBuilder', [ 'TwitterService', '$q', function (TwitterService, $q) {

			var buildFeed = function () {

				return $q(function (resolve, reject){
					var	feeds = [];

					TwitterService.getFeed(function (data) {
						console.log(data);
						for (var i = 0; i < data.tweets.statuses.length; i ++) {
							var feed = {};
							var status = data.tweets.statuses[i];

							addText(feed, status);
							addUser(feed, status.user);

							feeds.push(feed);
						}

						resolve(feeds);
					}, function (error) {
						reject();
					});

				});
			};


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

			return {
				buildFeed: buildFeed
			}

		}]);
})();