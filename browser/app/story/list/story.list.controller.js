'use strict';

app.controller('StoryListCtrl', function ($scope, stories, Story, users, OauthFactory) {
	$scope.stories = stories;
	$scope.users = users;
	$scope.newStory = new Story();
	$scope.isLoggedIn = OauthFactory.isLoggedIn;

	console.log("maybe logged in", $scope.isLoggedIn)
	
	$scope.removeStory = function (story) {
		story.destroy()
		.then(function () {
			var idx = $scope.stories.indexOf(story);
			$scope.stories.splice(idx, 1);
		});
	};

	$scope.addStory = function () {
		$scope.newStory.save()
		.then(function (created) {
			created.author = $scope.newStory.author;
			$scope.newStory = new Story();
			$scope.stories.unshift(created);
		});
	};
});