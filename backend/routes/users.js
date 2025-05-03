const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import the auth middleware
const User = require('../models/User'); // Import User model

// @route   GET api/users/me
// @desc    Get current logged-in user's profile
// @access  Private
router.get('/me', auth, async (req, res) => { // Use 'auth' middleware here
    try {
        // req.user.id is available because of the auth middleware
        // Find user by id but exclude the password field from the result
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// TODO: Add routes for updating profile, etc.

module.exports = router;