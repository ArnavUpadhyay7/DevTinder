const express = require('express');
const profileRouter = express.Router();
const User = require('../models/user');
const userAuth = require('../middlewares/auth.middleware.').userAuth;
const { validateEditProfile } = require('../utils/validator');

profileRouter.get('/view', userAuth, async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
});

profileRouter.patch('/edit', userAuth, async (req, res) => {
    try {
        if(!validateEditProfile(req)){
            return res.status(400).json({ message: 'Invalid fields in request' }); 
        }
        const user = req.user;
        
        // Update user profile with the fields provided in the request body
        Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
        
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = profileRouter;