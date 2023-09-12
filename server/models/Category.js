const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
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
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
}, {timestamps:true});

module.exports = mongoose.model("Category", categorySchema);