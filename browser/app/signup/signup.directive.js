app.directive('signUp', function (OauthFactory) {
	return {
		restrict: 'E',
		templateUrl: '/browser/app/signup/signup.template.html',
		scope: {
			buttonText: '@'
		},
		link: function (scope) {
			scope.specificMethod = function () {
				console.log("this maybe worked")
				if(scope.buttonText === "signup") {
					OauthFactory.signup(scope.email, scope.password);
				} else {
					OauthFactory.login(scope.email, scope.password);
				}
			}
		}
	}
})