const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// Route to create a new event (only for logged-in orphanage admins)
router.post('/create', async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const event = new Event({
            title,
            description,
            date,
            location,
            createdBy: req.user._id // Assuming user is stored in the request after login
        });

        await event.save();
        res.redirect('/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating event.');
    }
});

// Route to view all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'name');
        res.render('events', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching events.');
    }
});

module.exports = router;
