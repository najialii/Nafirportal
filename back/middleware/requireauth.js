const jwt = require('jsonwebtoken');
const User = require('../models/userModle'); 

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        const decoded = jwt.verify(token, process.env.SECRET);
        
        console.log("Decoded token:", decoded);



        req.user = await User.findById(decoded._id).select('-password'); 
        if (!req.user) return res.status(404).json({ message: 'User not found' });

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};


const roleMiddleware = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
    }
    next();
};

module.exports = { authMiddleware, roleMiddleware };
