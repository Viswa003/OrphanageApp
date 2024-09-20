const express = require('express');
const Donation = require('../models/Donation'); // Ensure you have a Donation model
const router = express.Router();

// Create a new donation
router.post('/', async (req, res) => {
    const donation = new Donation(req.body);
    try {
        await donation.save();
        res.status(201).send(donation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all donations and render the donations.ejs view
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find();
        res.render('donations', { donations });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a donation by ID and render a specific view (optional, if needed)
router.get('/:id', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).send('Donation not found');
        res.render('donationDetail', { donation }); // Ensure you have a 'donationDetail.ejs' view if using this route
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a donation (optionally render a view or send JSON response)
router.patch('/:id', async (req, res) => {
    try {
        const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!donation) return res.status(404).send('Donation not found');
        res.send(donation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a donation (optionally render a view or send JSON response)
router.delete('/:id', async (req, res) => {
    try {
        const donation = await Donation.findByIdAndDelete(req.params.id);
        if (!donation) return res.status(404).send('Donation not found');
        res.send(donation);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
