const express = require('express');
const router = express.Router();
const Orphanage = require('../models/Orphanage');

// Route to view all orphanages
router.get('/', async (req, res) => {
    try {
        const orphanages = await Orphanage.find();
        res.render('orphanages', { orphanages });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching orphanages.');
    }
});

module.exports = router;
