var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pasportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    }, 
    facebookId: String,
});

User.plugin(pasportLocalMongoose);

module.exports = mongoose.model('User', User);