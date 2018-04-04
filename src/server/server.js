//server
var express = require('express');
var morgan = require('morgan');
var app = express();
var helmet = require('helmet');
app.use(helmet());
app.use(morgan('dev'));
var port = process.env.PORT || 3000;
var path = require('path');
var bodyParser = require('body-parser');
var config = require('../../config.js');

app.use(bodyParser.json());


// database
var mongoose = require('mongoose');
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-auth'
var promise = mongoose.connect(url)
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
	console.log('DB connected to server');
})

// static files

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.use(express.static('dist'));

// passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var sess = {
    store: new MongoStore({url:url}),
	secret: config.secret,
	resave:false,
	saveUninitialized:false,
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.secure = true;
    console.log('Production mode');
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());


// routers
var publicRouter = require('./publicRoutes/publicRouter');

// admin api


// client api
app.use('/api', publicRouter);



// redirect to client
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
})

app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})

