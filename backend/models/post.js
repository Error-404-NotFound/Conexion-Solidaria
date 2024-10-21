const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    Description: String,
    Type: String,
    Location: String,
    ImageURL: String,
    Likes: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Post', PostSchema);