var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport,res){

    passport.use('register',new LocalStrategy({
        passReqToCallback:true,
    },

    function(req,username,password,done){
        User.findOne({'username':username},function(err,user){
            if(err){
                return res.json({err:'there was an error'});
            }
            if(!user){
                console.log(req.body);
                var newUser = new User();
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                newUser.email = req.body.email;

                newUser.save(function(err){
                    if(err){
                        return res.json({err:'there was an error'});
                    }
                    return res.json({success:'You are now registered.'})
                })
            }
            if(user){
                return res.json({err:'user already exist'})
            }
        })
    }

    ));
}

