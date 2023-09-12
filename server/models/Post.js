const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    slug: {
        type: String,
        unique: true,
        required: [true, "Please provide a unique title"]
    },
    featured_image: {
        type: String,
        required: [true, "Please provide a Featured image"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        index: true,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    content: {
        type: String
    },
    view_count: {
        type: Number,
    },
    like: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
