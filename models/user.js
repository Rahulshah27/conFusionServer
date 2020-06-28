var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pasportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(pasportLocalMongoose);

module.exports = mongoose.model('User', User);