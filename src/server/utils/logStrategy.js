var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

var config = require('../../../config.js');
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrid.API_KEY);

module.exports = function(passport,res){

	passport.use('login',new LocalStrategy({
		passReqToCallback:true,
	},

    function(req,username,password,done){
        User.findOne({'username':username},function(err,user){
            if(err){
                return res.json({err:'there was an error'});
            }

            if (!user || !user.validPassword(password)) {
                if (user.locked) {
                    console.log('account has been locked');
                    return res.json({err: 'an error occured'});
                }
                if (user) {
                    preventBrute(user);
                }
                return res.json({err: 'Invalid ID or password'});
            }
            req.login(user,function(err){
                if(err){
                    return res.json({err:'there was an error'});
                }
                console.log(user);
                return res.json({
                    user:user.username,
                    redirect:true,
                })
            })

        })
    }

	));
}

function preventBrute(user) {
    if (user.attempts < 5) {
        user.attempts = user.attempts + 1;
    }
    else {
        user.attempts = 0;
        user.locked = true;
        sendEmail();
    }
    console.log(user);
    console.log(user.attempts);
    user.save(function(err, user) {
        if (err) return console.error(err);
    });
}


function sendEmail(){
	const email = {
	  to: config.email,
	  from: 'VBZ@example.com',
	  subject: 'Account Locked',
	  text: 'Your account has been locked, go to link to unlock it'  
	};
	//console.log(email);	
	sgMail.send(email);
}
















