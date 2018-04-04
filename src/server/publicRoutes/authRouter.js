var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var User = require('../models/user');
var sanitize = require('../utils/cleanData');


passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// register
authRouter.route('/reg')

.post(sanitize, function(req,res,next){
    console.log('received data!');
    console.log(req.body);    

	if(!req.body.username || !req.body.password){
		return res.json({err:'incomplete form'})
	}
	require('../utils/regStrategy')(passport,res);
	passport.authenticate('register')(req,res,next);
})

// login
authRouter.route('/log')

.get(function(req,res){
	if(req.user){
		res.json({
            user:req.user.username,
        })
	}
	else{
		res.json({})
	}
})
.post(sanitize, function(req,res,next){
	if(!req.body.username || !req.body.password){
		return res.json({err:'incomplete form'})
	}
	require('../utils/logStrategy')(passport,res);
	passport.authenticate('login')(req,res,next);
})

// logout
authRouter.route('/logout')

.get(function(req,res){
	req.logOut();
	res.clearCookie('connect.sid');
	res.json({success:'You have logged out.'})
})


module.exports = authRouter;
