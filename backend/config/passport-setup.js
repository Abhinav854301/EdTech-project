const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjust path if your models are elsewhere
const jwt = require('jsonwebtoken');

passport.use(
    new GoogleStrategy({
        // Options for the Google strategy
        clientID: process.env.GOOGLE_CLIENT_ID, // Get from Google Cloud Console
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Get from Google Cloud Console
        callbackURL: '/api/auth/google/callback' // Matches the route we will create
    }, async (accessToken, refreshToken, profile, done) => {
        // Passport callback function - this runs after Google confirms the user
        // console.log('Google Profile:', profile); // Log profile to see available data

        try {
            // 1. Check if user already exists in our DB based on Google ID
            let currentUser = await User.findOne({ googleId: profile.id });

            if (currentUser) {
                // Already have the user
                console.log('User is:', currentUser);
                done(null, currentUser); // Proceed with this user
            } else {
                // If not, create a new user in our DB
                const newUser = await new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    // Use email from Google profile (ensure it's verified if possible)
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : null, 
                    // We don't store a password for OAuth users
                    // You might want to add a profile picture field: profile.photos[0].value
                }).save();
                console.log('New user created:', newUser);
                done(null, newUser); // Proceed with the new user
            }
        } catch (error) {
            console.error('Error in Google Strategy callback:', error);
            done(error, null);
        }
    })
);

// Note: We are NOT using passport.serializeUser/deserializeUser here because
// we will be using JWT for session management, not traditional sessions.