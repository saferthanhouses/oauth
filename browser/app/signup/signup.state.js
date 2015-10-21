'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/browser/app/signup/signup.html',
		controller: 'SignupCtrl'
	});
});

app.controller('SignupCtrl', function($scope, OauthFactory) {
	$scope.signupSubmit = function() {
		OauthFactory.signup($scope.email, $scope.password)
		// console.log($scope.email, $scope.password);

	}
})