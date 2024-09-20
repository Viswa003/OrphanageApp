const mongoose = require('mongoose');
const Donation = require('./models/Donation');
const Orphanage = require('./models/Orphanage');
const User = require('./models/User');
const Event = require('./models/Event');
const Child = require('./models/Child');
const Need = require('./models/Need');
const Volunteer = require('./models/Volunteer');

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
        await User.deleteMany({});
        await Event.deleteMany({});
        await Child.deleteMany({});
        await Need.deleteMany({});
        await Volunteer.deleteMany({});

        // Example orphanages
        const orphanages = [
            { name: 'Hope Orphanage', location: 'New York', description: 'A place full of hope and care for children.', capacity: 50 },
            { name: 'Sunshine Home', location: 'Los Angeles', description: 'Providing love and support to children in need.', capacity: 30 },
            { name: 'Bright Future Shelter', location: 'Chicago', description: 'Empowering children for a brighter future.', capacity: 40 }
        ];

        const insertedOrphanages = await Orphanage.insertMany(orphanages);
        console.log('Orphanages added successfully:', insertedOrphanages);

        // Example users
        const users = [
            { name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'Admin' },
            { name: 'Donor User', email: 'donor@example.com', password: 'password123', role: 'Donor' },
            { name: 'Volunteer User', email: 'volunteer@example.com', password: 'password123', role: 'Volunteer' }
        ];

        const insertedUsers = await User.insertMany(users);
        console.log('Users added successfully:', insertedUsers);

        // Example children
        const children = [
            { name: 'Alice', gender: 'Female', dateOfBirth: new Date('2013-05-01'), orphanage: insertedOrphanages[0]._id },
            { name: 'Bob', gender: 'Male', dateOfBirth: new Date('2011-03-15'), orphanage: insertedOrphanages[1]._id },
            { name: 'Charlie', gender: 'Male', dateOfBirth: new Date('2015-07-20'), orphanage: insertedOrphanages[2]._id }
        ];

        const insertedChildren = await Child.insertMany(children);
        console.log('Children added successfully:', insertedChildren);

        // Example needs
        const needs = [
            { title: 'Clothes for children', description: 'Winter clothes for kids', amountRequired: 500, orphanage: insertedOrphanages[0]._id },
            { title: 'Books for education', description: 'Textbooks and study material', amountRequired: 300, orphanage: insertedOrphanages[1]._id },
            { title: 'Toys for playtime', description: 'Toys for younger children', amountRequired: 200, orphanage: insertedOrphanages[2]._id }
        ];

        const insertedNeeds = await Need.insertMany(needs);
        console.log('Needs added successfully:', insertedNeeds);

        // Example donations
        const donorId = insertedUsers[1]._id; // Use the second user as donor
        const donations = [
            { donorName: 'John Doe', amount: 100, orphanage: insertedOrphanages[0]._id },
            { donorName: 'Jane Smith', amount: 200, orphanage: insertedOrphanages[1]._id },
            { donorName: 'Michael Brown', amount: 150, orphanage: insertedOrphanages[2]._id }
        ];

        const insertedDonations = await Donation.insertMany(donations);
        console.log('Donations added successfully:', insertedDonations);

        // Example events
        const events = [
            { title: 'Charity Run', description: 'A fun run for charity.', date: new Date(), location: 'City Park', createdBy: insertedUsers[0]._id },
            { title: 'Food Drive', description: 'Collecting food for the needy.', date: new Date(), location: 'Community Center', createdBy: insertedUsers[0]._id },
            { title: 'Toy Donation Drive', description: 'Bringing joy to children with toys.', date: new Date(), location: 'Local Mall', createdBy: insertedUsers[0]._id }
        ];

        const insertedEvents = await Event.insertMany(events);
        console.log('Events added successfully:', insertedEvents);

        // Example volunteers
        const volunteers = [
            { name: 'John Doe', email: 'john@example.com', phone: '1234567890', skills: ['Teaching'], availability: 'Weekdays' },
            { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', skills: ['Cooking'], availability: 'Weekends' }
        ];

        const insertedVolunteers = await Volunteer.insertMany(volunteers);
        console.log('Volunteers added successfully:', insertedVolunteers);

        // Linking needs and children to orphanages
        await Orphanage.updateMany(
            { _id: insertedOrphanages[0]._id },
            { $set: { children: [insertedChildren[0]._id], needs: [insertedNeeds[0]._id] } }
        );
        await Orphanage.updateMany(
            { _id: insertedOrphanages[1]._id },
            { $set: { children: [insertedChildren[1]._id], needs: [insertedNeeds[1]._id] } }
        );
        await Orphanage.updateMany(
            { _id: insertedOrphanages[2]._id },
            { $set: { children: [insertedChildren[2]._id], needs: [insertedNeeds[2]._id] } }
        );
        console.log('Orphanages updated with children and needs successfully.');

        // Close the connection
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

seedDatabase();
