const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please provide a name']
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    }
}, {timestamps:true});

module.exports = mongoose.model("Tag", tagSchema);