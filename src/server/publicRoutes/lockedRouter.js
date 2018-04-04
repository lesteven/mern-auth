var express = require('express');
var lockedRouter = express.Router();
var Locked = require('../models/locked');
var User = require('../models/user');

lockedRouter.route('/:url')

.get(function(req,res) {
    console.log(req.params)
    Locked.findOneAndRemove(req.params, function(err,locked) {
        if (!locked) {
            res.send("there's nothing here");
        }
        else {
            User.findOne({'username':locked.username},function(err,user){
                user.locked = false;
                user.attempts = 0;

                user.save(function(err, user) {
                    if (err) return console.error(err);
                });
            })
            res.send('account unlocked');
        } 
    })
})



module.exports = lockedRouter;

