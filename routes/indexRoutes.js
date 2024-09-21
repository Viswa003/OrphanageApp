const express = require('express');
const router = express.Router();
const Need = require('../models/Need');
const Event = require('../models/Event');
const Donation = require('../models/Donation');

router.get('/', async (req, res) => {
    try {
        const recentEvents = await Event.find().sort({ date: -1 }).limit(5);
        const urgentNeeds = await Need.find().sort({ dateCreated: -1 }).limit(5);
        const latestDonations = await Donation.find().sort({ date: -1 }).limit(5);

        res.render('index', {
            user: req.user, 
            recentEvents, 
            urgentNeeds, 
            latestDonations
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
