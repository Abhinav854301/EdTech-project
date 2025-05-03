const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        lowercase: true // Store emails in lowercase
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // Add other fields as needed (e.g., enrolledCourses, progress)
});

module.exports = mongoose.model('User', UserSchema);