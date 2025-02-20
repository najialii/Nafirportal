const User = require('../models/userModle');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const genToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Signup user
const signUp = async (req, res) => {
    const { email, password, role, ...additionalData } = req.body;

    try {
        
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        if (!validator.isEmail(email)) {
            throw new Error('Please enter a valid email address');
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error('Please enter a stronger password');
        }
        if (!['mentee', 'mentor', 'admin'].includes(role)) {
            throw new Error('Invalid role provided');
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare user data based on role
        let userData = { email, password: hashedPassword, role };

        // if (role === 'mentee') {
        //     if (!additionalData.country) {
        //         throw new Error('Country is required for mentees');
        //     }
        //     userData = { ...userData, country: additionalData.country };
        // } 
         if (role === 'mentor') {
            if (!additionalData.name || !additionalData.skills) {
                throw new Error('Mentors must provide a name and skills');
            }
            userData = { ...userData, ...additionalData, isApproved: false }; 
        }

        
        const user = await User.create(userData);
        const token = genToken(user._id);

        res.status(201).json({ email: user.email, role: user.role, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }


        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Incorrect email or password');
        }


        if (user.role === 'mentor' && !user.isApproved) {
            return res.status(403).json({ error: 'Your mentor account is awaiting approval' });
        }


        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error('Incorrect email or password');
        }

        
        const token = genToken(user._id);

        res.status(200).json({userid: user._id, email: user.email, role: user.role, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};


//mentor approve 

const approveMentor = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.role !== 'mentor') {
            return res.status(400).json({ error: 'User is not a mentor' });
        }

        user.isApproved = true;
        await user.save();

        res.status(200).json({ message: 'Mentor approved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAccountsByApprovalStatus = async (req, res) => {
    try {
        const { isApproved } = req.query;
        const accounts = await User.find({ isApproved: isApproved === 'true' });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    signUp,
    login,
    approveMentor,
    getAccountsByApprovalStatus,
    getCurrentUser
};
