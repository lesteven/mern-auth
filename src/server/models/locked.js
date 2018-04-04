var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Locked = new Schema({
    username:String,
    url: String,
})

module.exports = mongoose.model('LockedAccounts', Locked);
