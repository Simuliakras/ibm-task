const mongoose = require('mongoose');
 
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    labels: {
        type: [String],
        required: true
    },

    path: {
        type: String,
        required: true
    }
}, {timestamps:true});
 
module.exports = new mongoose.model('Image', imageSchema);