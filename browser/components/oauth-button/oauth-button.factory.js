app.factory('OauthFactory', function ($http) {
	OauthFactory = {}

	OauthFactory.isLoggedIn = null;
	// OauthFactory.currentUser = null;

	// check whether the session has already been logged in.
	$http.get('/auth/me')
	.then(function (response) {
		OauthFactory.isLoggedIn = response.data;
	})

	OauthFactory.signup = function (email, password) {
		$http.post('/api/users/signup', {email: email, password: password})
		.then(function (response) {
			console.log("signup", response.data)
			OauthFactory.isLoggedIn = true;
			// this.currentUser = 
		})
	}

	OauthFactory.login = function (email, password) {
		$http.post('/api/users/login', {email: email, password: password})
		.then(function (response) {
			console.log("login", response.data)
			OauthFactory.isLoggedIn = true;
			// this.currentUser = 
		})
	}

	OauthFactory.logout = function() {
		$http.post('api/users/logout', {})
			.then(function(response){
				OauthFactory.isLoggedIn = null;
				console.log("logout", response.data);
			})
	}

	return OauthFactory;
})


///////////////////////////////////////////////////////

// User logs in

// User opens the site ---> logged in 
// 		session already has id

// 	backend -----> frontend 