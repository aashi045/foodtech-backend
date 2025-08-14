const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Missing token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store full user info from token in req.user
        req.user = decoded;

        // If you still want direct access to ID for convenience
        // req.userId = decoded.id;

        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
