const jwt = require('jsonwebtoken')
const User = require('../dataModels/userModel')

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader) {
        return res.status(401).json({error: 'Authorization token required'})
      }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // assuming your payload has userId
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = authenticateToken