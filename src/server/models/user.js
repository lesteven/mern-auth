var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var User = new Schema({
    email: String,
	username: String,
	password: String,
    question: String,
    answer: String,
    locked: { type: Boolean, default: false },
    attempts: {type: Number, default: 0 }
})

User.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(12));
}
User.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', User);
