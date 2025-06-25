const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const {
            username,
            currentPassword,
            newPassword,
            profession,
            companyName,
            addressLine1,
            country,
            state,
            city,
            subscriptionPlan,
            newsletter
        } = req.body;

        const profilePhoto = req.file;

        if (!profilePhoto) return res.status(400).json({ message: 'Profile photo is required' });

        // Hash password
        if (!newPassword) return res.status(400).json({ message: 'New password required' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = new User({
            // profilePhoto,
            username,
            password: hashedPassword,
            profession,
            companyName: profession === 'Entrepreneur' ? companyName : undefined,
            addressLine1,
            country,
            state,
            city,
            subscriptionPlan,
            newsletter
        });

        await user.save();
        res.status(201).json({ message: 'User saved successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
