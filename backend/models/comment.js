const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    Likes: {
        type: [String],
        default: [], // Default to an empty array
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reply'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);