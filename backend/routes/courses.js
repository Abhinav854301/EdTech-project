const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import the middleware
// const Course = require('../models/Course'); // You would uncomment and use this if you had a Course model

// @route   GET api/courses/my-courses
// @desc    Get courses enrolled by the logged-in user
// @access  Private
router.get('/my-courses', auth, async (req, res) => { // <-- Use 'auth' middleware here
    try {
        // Because 'auth' middleware ran, req.user.id is available
        console.log(`Fetching courses for user: ${req.user.id}`);
        
        // --- Replace with your actual database logic --- 
        // Example: Fetch courses where the user's ID is in an 'enrolledUsers' array
        // const courses = await Course.find({ enrolledUsers: req.user.id }); 
        
        // Placeholder data for now:
        const courses = [
            { id: 'course1', title: 'Introduction to Programming', description: 'Learn the basics.' },
            { id: 'course2', title: 'Web Development Fundamentals', description: 'HTML, CSS, JS.' }
        ]; 
        // --- End of placeholder data ---

        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching courses');
    }
});

// Example of a public route in the same file (doesn't use 'auth' middleware)
// @route   GET api/courses/all
// @desc    Get all available courses (public list)
// @access  Public
router.get('/all', async (req, res) => {
    try {
        // --- Replace with your actual database logic --- 
        // const allCourses = await Course.find().select('title description'); // Example
        const allCourses = [
            { id: 'course1', title: 'Introduction to Programming' },
            { id: 'course2', title: 'Web Development Fundamentals' },
            { id: 'course3', title: 'Advanced Algorithms' }
        ]; // Placeholder
        // --- End of placeholder data ---
        res.json(allCourses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching all courses');
    }
});

module.exports = router;