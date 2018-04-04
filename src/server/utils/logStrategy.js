var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;


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
