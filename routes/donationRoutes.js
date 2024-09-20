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

// Get all donations
router.get('/', async (req, res) => {
    const donations = await Donation.find();
    res.send(donations);
});

// Get a donation by ID
router.get('/:id', async (req, res) => {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).send();
    res.send(donation);
});

// Update a donation
router.patch('/:id', async (req, res) => {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donation) return res.status(404).send();
    res.send(donation);
});

// Delete a donation
router.delete('/:id', async (req, res) => {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) return res.status(404).send();
    res.send(donation);
});

module.exports = router;