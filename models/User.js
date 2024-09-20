const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Donor', 'Volunteer', 'OrphanageAdmin'],
        required: true
    },
    associatedOrphanage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orphanage'
    },
    skills: [String],
    availability: {
        type: [String],
        enum: ['Weekday', 'Weekend', 'Evening', 'Flexible']
    },
    donationHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation'
    }],
    volunteerHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VolunteerActivity'
    }]
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);