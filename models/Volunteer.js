const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    skills: {
        type: [String], // Array of skills
        default: [],
    },
    availability: {
        type: String, // e.g., "Weekdays", "Weekends", etc.
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Volunteer model
const Volunteer = mongoose.model('Volunteer', VolunteerSchema);

module.exports = Volunteer;