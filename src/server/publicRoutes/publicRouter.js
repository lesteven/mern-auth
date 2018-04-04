var express = require('express');
var publicRouter = express.Router();


// public routes
var authRouter = require('./authRouter');
var lockedRouter = require('./lockedRouter');


publicRouter.use('/auth', authRouter);
publicRouter.use('/locked', lockedRouter);


module.exports = publicRouter;
