const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profilePhoto: { type: String, required: false }, // Assuming profilePhoto is a URL or path to the image
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profession: { type: String, enum: ['Student', 'Developer', 'Entrepreneur'], required: true },
    companyName: { type: String },
    addressLine1: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    subscriptionPlan: { type: String, enum: ['Basic', 'Pro', 'Enterprise'], required: true },
    newsletter: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
