var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var Locked = require('../models/locked');
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
                if (user && user.locked) {
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
                user.attempts = 0;
                user.save(function(err, user) {
                    if (err) return console.error(err);
                });
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
//        sendEmail();
        const url = generateUnlock();
        addLockedToDB(user.username, url); 
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

function generateUnlock() {
    const alphaNum = '1234567890abcdefghijklmnopqrstuvwxyz';
    let string = '';
    const len = alphaNum.length;

    for (let i = 0; i < 62; i++) {
        const place = Math.floor(Math.random() * len);
        string += alphaNum[place];
    }
    return string;
}
function addLockedToDB(username, url) {
    const account = new Locked({
        username,
        url
    })
    account.save(function(err, locked) {
        if (err) return console.log(err);
    })
    console.log(account);
}













