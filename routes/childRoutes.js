const express = require('express');
const router = express.Router();
const Child = require('../models/Child');
const Orphanage = require('../models/Orphanage');

// Route to display all children
router.get('/', async (req, res) => {
    try {
        const children = await Child.find().populate('orphanage');
        res.render('children/index', { children });
    } catch (err) {
        res.status(500).send('Error fetching children.');
    }
});

// Route to show the form for adding a new child
router.get('/new', async (req, res) => {
    try {
        const orphanages = await Orphanage.find();
        res.render('children/new', { orphanages });
    } catch (err) {
        res.status(500).send('Error fetching orphanages.');
    }
});

// Route to handle the submission of the new child form
router.post('/', async (req, res) => {
    try {
        const { name, dateOfBirth, gender, orphanage, educationLevel, medicalNeeds, guardianContact, supportHistory } = req.body;
        const newChild = new Child({
            name,
            dateOfBirth,
            gender,
            orphanage,
            educationLevel,
            medicalNeeds,
            guardianContact,
            supportHistory
        });
        await newChild.save();
        res.redirect('/children');
    } catch (err) {
        res.status(500).send('Error adding child.');
    }
});

module.exports = router;
