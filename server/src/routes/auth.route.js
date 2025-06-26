const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const cookieParser = require('cookie-parser');
authRouter.use(cookieParser());
const userAuth = require('../middlewares/auth.middleware.').userAuth;

authRouter.post('/signup', async (req, res)=>{

    const {firstname, lastname, email, password, age, gender, photoURL, about} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const user = User.findOne({email});
        if(user){
            return res.status(400).send('User already exists with this email');
        }

        const newUser = new User({firstname, lastname, email, age, gender, photoURL, about,
        password: hashedPassword});
        await newUser.save();

        // Generate JWT token and set it in a cookie
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000*24 // 24 hour
        });

        res.status(200).json({message: 'User created successfully', token});

    } catch (error) {
        res.status(400).send('Error creating user:' + error.message);
    }
})

authRouter.post('/login', async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).send('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid credentials');
        }
        
        // Generate JWT token and set it in a cookie
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.cookie('token', token, {
            httpOnly: true,
        });

        res.status(200).json({message: 'Login successful', token});
    }
    catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
})

authRouter.get('/logout', userAuth, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'});
})

module.exports = authRouter;