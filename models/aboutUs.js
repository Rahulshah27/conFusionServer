const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const aboutUsSchema = new Schema({
    
    description: {
        type: String,
        required: true
    },
    logo: {
       // data: Buffer,
       Type: String,
       default: ''
    },
});

var AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs;