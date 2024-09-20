const mongoose = require('mongoose');
const Donation = require('./models/Donation');
const Orphanage = require('./models/Orphanage');
const User = require('./models/User'); // Ensure you have this model if using req.user

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/orphanageDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function seedDatabase() {
    try {
        // Clear existing data
        await Donation.deleteMany({});
        await Orphanage.deleteMany({});

        // Example orphanages
        const orphanages = [
            { name: 'Hope Orphanage', location: 'New York', description: 'A place full of hope and care for children.' },
            { name: 'Sunshine Home', location: 'Los Angeles', description: 'Providing love and support to children in need.' },
            { name: 'Bright Future Shelter', location: 'Chicago', description: 'Empowering children for a brighter future.' }
        ];

        // Insert orphanages into the database
        const insertedOrphanages = await Orphanage.insertMany(orphanages);
        console.log('Fake orphanages added successfully.');

        // Find a sample orphanage
        const orphanageId = insertedOrphanages[0]._id; // Use the first orphanage for seeding

        // Find a sample user
        const users = await User.find();
        const donorId = users[0]._id; // Use the first user for seeding

        // Example donations
        const donations = [
            { amount: 100, donor: donorId, orphanage: orphanageId },
            { amount: 200, donor: donorId, orphanage: orphanageId },
            { amount: 150, donor: donorId, orphanage: orphanageId }
        ];

        // Insert donations into the database
        await Donation.insertMany(donations);
        console.log('Fake donations added successfully.');

        // Close the connection
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}
