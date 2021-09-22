const mongoose = require('mongoose');
 
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    labels: {
        type: Array,
        required: true
    },

    path: {
        type: String,
        required: true
    },

    uploadDate: {
        type: Date,
        default: Date.now
    }
});
 
module.exports = new mongoose.model('Image', imageSchema);