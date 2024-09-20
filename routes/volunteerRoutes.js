const express = require('express');
const Volunteer = require('../models/Volunteer'); // Ensure you have a Volunteer model
const router = express.Router();

// Create a new volunteer
router.post('/', async (req, res) => {
    const volunteer = new Volunteer(req.body);
    try {
        await volunteer.save();
        res.status(201).send(volunteer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all volunteers
router.get('/', async (req, res) => {
    const volunteers = await Volunteer.find();
    res.send(volunteers);
});

// Get a volunteer by ID
router.get('/:id', async (req, res) => {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).send();
    res.send(volunteer);
});

// Update a volunteer
router.patch('/:id', async (req, res) => {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!volunteer) return res.status(404).send();
    res.send(volunteer);
});

// Delete a volunteer
router.delete('/:id', async (req, res) => {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) return res.status(404).send();
    res.send(volunteer);
});

module.exports = router;