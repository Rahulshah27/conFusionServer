const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


// var cpuSchema = new Schema({
//     title: {
//         type: String,
//         default: ''
//     },

//     description: {
//         type: String,
//         default: ''
//     },

//     link: {
//         // prduct links/ link
//         type: String,
//         default: ''
//     }
// });

// var gpuSchema = new Schema({
//     title: {
//         type: String,
//         default: ''
//     },

//     description: {
//         type: String,
//         default: ''
//     },

//     link: {
//         // prduct links/ link
//         type: String,
//         default: ''
//     }
// });

// var ramSchema = new Schema({
//     title: {
//         type: String,
//         default: ''
//     },

//     description: {
//         type: String,
//         default: ''
//     },

//     link: {
//         // prduct links/ link
//         type: String,
//         default: ''
//     }
// });


// var moboSchema = new Schema({
//     title: {
//         type: String,
//         default: ''
//     },

//     description: {
//         type: String,
//         default: ''
//     },

//     link: {
//         // prduct links/ link
//         type: String,
//         default: ''
//     }
// });


// var psuSchema = new Schema({
//     title: {
//         type: String,
//         default: ''
//     },

//     description: {
//         type: String,
//         default: ''
//     },

//     link: {
//         // prduct links/ link
//         type: String,
//         default: ''
//     }
// });

// var ssdSchema = new Schema({
//     title: {
//         type: String,
//         default: ''
//     },

//     description: {
//         type: String,
//         default: ''
//     },

//     link: {
//         // prduct links/ link
//         type: String,
//         default: ''
//     }
// });


// var hddSchema = new Schema({
//     title: {
//         type: String,
//         default: ''
//     },

//     description: {
//         type: String,
//         default: ''
//     },

//     link: {
//         // prduct links/ link
//         type: String,
//         default: ''
//     }
// });

// var caseSchema = new Schema({
//     title: {
//         type: String,
//         default: ''
//     },

//     description: {
//         type: String,
//         default: ''
//     },

//     link: {
//         // prduct links/ link
//         type: String,
//         default: ''
//     }
// });


// var coolerSchema = new Schema({
//     title: {
//         type: String,
//         default: ''
//     },

//     description: {
//         type: String,
//         default: ''
//     },

//     link: {
//         // prduct links/ link
//         type: String,
//         default: ''
//     }
// });

 // const speckListSchema = new Schema({

//     cpu: [cpuSchema],
//     gpu: [gpuSchema],
//     ram: [ramSchema],
//     mobo: [moboSchema],
//     psu: [psuSchema],
//     ssd: [ssdSchema ],
//     hdd: [hddSchema],
//     case: [caseSchema],
//     cooler: [coolerSchema],

// });

const rangeSchema = new Schema({

    tite: {
        type: String,
        default: "High-End"
    },

    description: {
        type: String,
        default: 'this is the highest level of the gaming pc'
    },

    thumbnail: {
        //data: Buffer,
        type: String,
        default: 'upload image'
    },

    //specList: [speckListSchema]
});
const gammingSchema = new Schema({
    
    title: {
        type: String,
        default: ''
    },
    range: [rangeSchema]
},
    {
    timestamps: true
});

var Gamming = mongoose.model('Gamming', gammingSchema);

module.exports = Gamming;