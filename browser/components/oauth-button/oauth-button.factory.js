app.factory('OauthFactory', function ($http) {
	OauthFactory = {}

	OauthFactory.signup = function (email, password) {
		$http.post('/api/users/signup', {email: email, password: password})
		.then(function (response) {
			console.log("signup", response.data)
		})
	}

	OauthFactory.login = function (email, password) {
		$http.post('/api/users/login', {email: email, password: password})
		.then(function (response) {
			console.log("login", response.data)
		})
	}

	return OauthFactory;
})