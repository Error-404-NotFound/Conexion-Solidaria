const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    Description: {
        type: String,
        required: true
    },
    Tag: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Image: {
        url: String,
        filename: String
    },
    Likes: {
        type: [String],
        default: [], // Default to an empty array
    },
    username: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    donation: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation'
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
