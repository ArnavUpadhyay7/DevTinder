// auth middleware 
const jwt = require('jsonwebtoken');
const User = require('../models/user');
 
const userAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        req.user = user;
        next();
    }
    catch (error){
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = {
    userAuth,
};