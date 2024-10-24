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
        data: Buffer,  // Store the binary image data
        contentType: String  // Store the image's MIME type, e.g., 'image/jpeg', 'image/png'
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
    ]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
