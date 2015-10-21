'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/browser/app/login/login.html',
		controller: "LoginCtrl"
	});
});

app.controller('LoginCtrl', function($scope, OauthFactory) {
	
	$scope.loginSubmit = function() {
		OauthFactory.login()
		// console.log($scope.email, $scope.password);
	}
})