const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const dashboardSchema = new Schema({
     description: {
         type: String,
         required: true
     },
     imageGame: {
        // data: Buffer,
        Type: String,
        default: ''
     },
     price: {
         type: Currency,
         default: 0
     },

     imageWork: {
        // data: Buffer,
        Type: String,
        default: ''
     },

     address: {
        type: String,
        default: 'Jalandhar'
     },
     email: {
         type: String,
         default: 'pcPicker@pcPicker.com'
     },
     tel: {
        type: Number,
        default: 8433434343
     },
     logo: {
         type: String,
         default: 'logo'
     }
}, {
    timestamps: true
});

var Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;