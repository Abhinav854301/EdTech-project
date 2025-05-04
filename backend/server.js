require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport'); // <-- Add passport require
require('./config/passport-setup'); // <-- Add this line to run the setup

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // <-- Initialize Passport

// --- Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Mongoose 6 doesn't require useCreateIndex or useFindAndModify
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

connectDB(); // Call the function to connect
// -------------------------

// Basic Route
app.get('/', (req, res) => {
    res.send('Backend Server is Running!');
});

// --- API Routes ---
// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses')); 
// ------------------

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});