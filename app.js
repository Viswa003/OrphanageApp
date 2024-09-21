const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const donationRoutes = require('./routes/donationRoutes');
const needRoutes = require('./routes/needRoutes'); // Ensure this line is present
const orphanageRoutes = require('./routes/orphanageRoutes');
const childRoutes = require('./routes/childRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const needsRoutes = require('./routes/needRoutes');
const indexRoutes = require('./routes/indexRoutes'); 
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Session configuration
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/orphanageDB' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/orphanageDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error: ' + err));

// Routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/donations', donationRoutes);
app.use('/needs', needRoutes); // Ensure this line is present
app.use('/orphanages', orphanageRoutes);
app.use('/children', childRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/events', eventRoutes);
app.use('/needs', needsRoutes);
app.use('/children', childRoutes);
app.use('/donations', donationRoutes);


// Home Route
app.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});