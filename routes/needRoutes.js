const express = require('express');
const router = express.Router();
const Need = require('../models/Need');
const Orphanage = require('../models/Orphanage');

// Route to view needs of a specific orphanage
router.get('/:orphanageId', async (req, res) => {
    try {
        const orphanageId = req.params.orphanageId;
        const orphanage = await Orphanage.findById(orphanageId);
        if (!orphanage) {
            return res.status(404).send('Orphanage not found');
        }
        
        const needs = await Need.find({ orphanage: orphanageId });
        res.render('needs', { orphanage, needs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching needs.');
    }
});

module.exports = router;
