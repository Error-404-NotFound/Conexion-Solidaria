const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
    postId: {
        type: String,
        required: true
    },
    donorName: {
        type: String,
        required: true
    },
    remark: {
        type: String,
        required: true
    },
    percentageHelped: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);