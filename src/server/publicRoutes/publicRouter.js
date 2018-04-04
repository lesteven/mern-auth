var express = require('express');
var publicRouter = express.Router();


// public routes
var authRouter = require('./authRouter');

publicRouter.use('/auth', authRouter);



module.exports = publicRouter;
