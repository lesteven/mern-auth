var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var User = new Schema({
    email: String,
	username: String,
	password: String,
    question: String,
    answer: String,
    locked: Boolean,
    attempts: Number
})

User.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(12));
}
User.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', User);
