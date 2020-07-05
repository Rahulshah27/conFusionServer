var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pasportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(pasportLocalMongoose);

module.exports = mongoose.model('User', User);