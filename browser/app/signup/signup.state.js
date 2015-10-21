'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/browser/app/signup/signup.html',
		controller: 'SignupCtrl'
	});
});

app.controller('SignupCtrl', function($scope) {
	$scope.signupSubmit = function() {
		console.log($scope.email, $scope.password);

	}
})