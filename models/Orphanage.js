const mongoose = require('mongoose');

const orphanageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    currentOccupancy: {
        type: Number,
        default: 0
    },
    needs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Need'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    volunteers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child'
    }],
    donationHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation'
    }]
});

module.exports = mongoose.model('Orphanage', orphanageSchema);