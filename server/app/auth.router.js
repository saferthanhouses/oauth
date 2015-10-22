var express = require('express');
var router = express.Router();

// isLoggedIn?
router.get('/me', function (req, res, next) {
	console.log("getting me")
	console.log("req.session.userId", req.session.userId)
	res.send(req.session.userId);
})

router.get('/google/callback',function(req,res,next){

})

module.exports = router;