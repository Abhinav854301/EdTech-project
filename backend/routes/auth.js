const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path if needed
const passport = require('passport'); // <-- Add passport require

// --- Registration Route --- 
// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // 2. Create new user instance
        user = new User({
            name,
            email,
            password, // Plain text password for now
        });

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Save user to database
        await user.save();

        // 5. Create and return JWT token
        const payload = {
            user: {
                id: user.id, // Mongoose adds 'id' virtually
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token expires in 1 hour (adjust as needed)
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Send token back to client
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during registration');
    }
});

// --- Login Route --- 
// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 2. Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 3. Create and return JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during login');
    }
});

    // --- Google OAuth Routes --- 

    // @route   GET /api/auth/google
    // @desc    Initiate Google OAuth login flow
    // @access  Public
    router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email'] // Request access to user's profile and email
    }));

    // @route   GET /api/auth/google/callback
    // @desc    Callback route for Google to redirect to after authentication
    // @access  Public
    router.get('/google/callback', 
        passport.authenticate('google', { session: false, failureRedirect: '/login.html' }), // Use session: false for JWT
        (req, res) => {
            // Successful authentication from Google!
            // req.user is populated by the passport callback function in passport-setup.js
            
            // Create JWT payload
            const payload = {
                user: {
                    id: req.user.id,
                },
            };

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    // Redirect user back to the frontend, passing the token
                    // Option 1: Redirect with token in query parameter (simple, but less secure)
                    // res.redirect(`http://localhost:5500/index.html?token=${token}`); // Adjust frontend URL/port if needed
                    
                    // Option 2: Render a simple page that sets localStorage and redirects (more secure)
                    res.send(`
                        <script>
                            localStorage.setItem('token', '${token}');
                            window.location.href = '/index.html'; // Redirect to your main frontend page
                        </script>
                    `);
                }
            );
        }
    );

    module.exports = router;