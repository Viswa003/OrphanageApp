const express = require('express');
const router = express.Router();
const Need = require('../models/Need');
const Orphanage = require('../models/Orphanage');

router.get('/needs', async (req, res) => {
    try {
        const needs = await Need.find().populate('orphanage');
        const needsWithOrphanageNames = needs.map(need => ({
            ...need.toObject(),
            orphanageName: need.orphanage.name
        }));
        res.render('needs', { needs: needsWithOrphanageNames });
    } catch (err) {
        console.error('Error fetching needs:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
