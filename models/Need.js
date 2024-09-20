const mongoose = require('mongoose');
const { Schema } = mongoose;

const needSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amountRequired: {
        type: Number,
        required: true
    },
    orphanage: {
        type: Schema.Types.ObjectId,
        ref: 'Orphanage',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Need = mongoose.model('Need', needSchema);
module.exports = Need;
