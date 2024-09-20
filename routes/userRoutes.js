const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Serve Registration Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Serve Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Register User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }
        res.send(`Welcome ${user.name}, you are logged in as a ${user.role}`);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

module.exports = router;
