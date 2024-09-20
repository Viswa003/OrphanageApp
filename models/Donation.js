const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: String,
        default: '',
    },
});

// Create the Donation model
const Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;