const express = require('express');
const router = express.Router();
const Child = require('../models/Child');
const Orphanage = require('../models/Orphanage');

// List all children
router.get('/', async (req, res) => {
    try {
        const children = await Child.find().populate('orphanage');
        res.render('children/index', { children });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching children.');
    }
});

// Form to add a new child
router.get('/new', async (req, res) => {
    try {
        const orphanages = await Orphanage.find();
        res.render('children/new', { orphanages });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading new child form.');
    }
});

// Add a new child
router.post('/', async (req, res) => {
    try {
        const child = new Child(req.body);
        await child.save();
        res.redirect('/children');
    } catch (error) {
        console.error(error);
        res.status(400).send('Error adding new child.');
    }
});

// View a specific child's details
router.get('/:id', async (req, res) => {
    try {
        const child = await Child.findById(req.params.id).populate('orphanage');
        if (!child) {
            return res.status(404).send('Child not found');
        }
        res.render('children/show', { child });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching child details.');
    }
});

// Form to edit a child's information
router.get('/:id/edit', async (req, res) => {
    try {
        const child = await Child.findById(req.params.id);
        const orphanages = await Orphanage.find();
        if (!child) {
            return res.status(404).send('Child not found');
        }
        res.render('children/edit', { child, orphanages });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading edit form.');
    }
});

// Update a child's information
router.post('/:id', async (req, res) => {
    try {
        const child = await Child.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.redirect(`/children/${child._id}`);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating child information.');
    }
});

// Delete a child's record
router.post('/:id/delete', async (req, res) => {
    try {
        await Child.findByIdAndDelete(req.params.id);
        res.redirect('/children');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting child record.');
    }
});

// Add support history to a child
router.post('/:id/support', async (req, res) => {
    try {
        const child = await Child.findById(req.params.id);
        child.supportHistory.push(req.body);
        await child.save();
        res.redirect(`/children/${child._id}`);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error adding support history.');
    }
});

module.exports = router;