var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../api/users/user.model.js')

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: '289698502406-pci01vb20q0mfqij7ktanspugrmqkjs0.apps.googleusercontent.com',
        clientSecret: '1HxvQpkNiXTVmWNKI7rwjnaA',
        callbackURL: '/auth/google/callback'
    },
    // google will send back the token and profile
    function (token, refreshToken, profile, done) {
        //the callback will pass back user profilie information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
        console.log('---', 'in verification callback', profile, '---');

        User.findOne({ 'google.id' : profile.id }, function (err, user) {
		    // if there is an error, stop everything and return that
		    // ie an error connecting to the database
		    if (err) return done(err);
		    // if the user is found, then log them in
		    if (user) {
		    	console.log("user", user)
		        return done(null, user); // user found, pass along that user
		    } else {
		        // if there is no user found with that google id, create them
		        var newUser = new User();
		        // set all of the google information in our user model
		        newUser.google.id = profile.id; // set the users google id                   
		        newUser.google.token = token; // we will save the token that google provides to the user                    
		        newUser.google.name = profile.displayName; // look at the passport user profile to see how names are returned
		        newUser.google.email = profile.emails[0].value; // google can return multiple emails so we'll take the first
		        // don't forget to include the user's email, name, and photo
		        newUser.email = newUser.google.email; // required field
		        newUser.name = newUser.google.name; // nice to have
		        newUser.photo = profile.photos[0].value; // nice to have
		        // save our user to the database
		        newUser.save(function (err) {
		            if (err) done(err);
		            // if successful, pass along the new user
		            else done(null, newUser);
		        });
		    }
		});

        return done(null, profile)
    })
);


// isLoggedIn?
router.get('/me', function (req, res, next) {
	console.log("getting me")
	console.log("req.session.userId", req.session.userId)
	res.send(req.session.userId);
})

router.get('/google', passport.authenticate('google', { scope : 'email' }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/'
  }));

module.exports = router;