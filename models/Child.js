const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    orphanage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orphanage',
        required: true
    },
    educationLevel: String,
    medicalNeeds: [String],
    guardianContact: {
        name: String,
        relationship: String,
        phone: String
    },
    supportHistory: [{
        type: {
            type: String,
            enum: ['Education', 'Medical', 'Clothing', 'Food', 'Other']
        },
        description: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('Child', childSchema);