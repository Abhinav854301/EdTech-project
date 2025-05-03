const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');

    // Check if Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token or invalid format, authorization denied' });
    }

    // Extract the token part (remove 'Bearer ')
    const token = authHeader.split(' ')[1];

    // Check if no token after split
    if (!token) {
        return res.status(401).json({ msg: 'No token found after Bearer, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Add user payload (contains user id) to the request object
        next(); // Call the next middleware or route handler
    } catch (err) {
        console.error('Token verification failed:', err.message); // Log the error for debugging
        res.status(401).json({ msg: 'Token is not valid' });
    }
};