    const User = require('../models/userModle');
    const jwt = require('jsonwebtoken');
    const sendMail = require('./mailer')
    const crypto = require('crypto')


    const bcrypt = require('bcrypt');
    const validator = require('validator');

    const genToken = (_id) => {
        return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '100y' });
    };


    const signUp = async (req, res) => {
        console.log(req.body);
        const { email, password,department, role, ...additionalData } = req.body;

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
            if (!['mentee', 'mentor', 'admin', 'superadmin'].includes(role)) {
                throw new Error('Invalid role provided');
            }

            
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already exists');
            }

        
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const emailToken = crypto.randomBytes(64).toString("hex");        


            
    
            let userData = { email, password: hashedPassword,department,role, name:additionalData.name };

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
    sendMail(email, emailToken);
            res.status(201).json({ email: user.email,emailToken : emailToken, role: user.role, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };


// TODO
    // const emailVerification = ()=>{
    //     console.log('email verification')
    // }


    const login = async (req, res) => {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                throw new Error('Email and password are required');
            }


            const user = await User.findOne({ email }).populate('department')
            if (!user) {
                throw new Error('Incorrect email or password');
            }
            console.log("User found:", user); 


            if (user.role === 'mentor' && !user.isApproved || user.role === 'admin' && !user.isApproved) {
                return res.status(403).json({ error: 'Your mentor account is awaiting approval' });
            }


            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new Error('Incorrect email or password');
            }
            if (!user._id) {
                throw new Error("User ID is undefined");
            }
        
            const token = genToken(user._id);

        
            res.status(200).json({userid: user._id, email: user.email, role: user.role, token: token ,department: user.department._id  });
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    };



    const approveUsers = async (req, res) => {
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
            const accounts = await User.find({ isApproved: isApproved === 'false' });
            const filterAccounts = accounts.filter(accounts => accounts.role === 'mentor') 
            res.status(200).json(filterAccounts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const getCurrentUser = async (req, res) => {
        try {
            const user = req.user;
            if(!user){
                return res.status(404).json({error: 'user not foud'})
            }
            console.log("Current user:", user);

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };



    // ubid
    const getUserById = async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            } 
            if(user) {
                console.log('guess what user actuall exisit ',user)
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    const  achievements  = async(req,res) =>{
        try{
            const user = req.body 


            if(!!user){
             return res.status(200).json(user) 
            }
            console.log('here is the user ', user )
            if(!user || user.role !== 'mentee'){
                return res.status(401).json({error: 'forbidden'})
            }
            const {achievements} = req.body
            if (!['Not yet','job', 'course', 'project'].includes(achievements)) {
                return res.status(400).json({ error: 'Invalid achievement type' });
            }
            user.achievements = achievements
            await user.save()
            res.status(200).json({message: 'congratulations on your achievements, share with the world'})
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }

    const getAllUsers = async (req, res) => {
        try {
            const reqtingUser = req.user;

            if (!reqtingUser) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            if (reqtingUser.role === 'superadmin') {
                const users = await User.find().select('-password');
                const filteredUsers = users.filter(user => user.role !== reqtingUser.role)
                return res.status(200).json(filteredUsers);
            }         else if (reqtingUser.role === 'admin') {  
                if (!reqtingUser.department) {
                    return res.status(404).json({ message: 'Admin has no associated department' });
                }
                            const users = await User.find({
                    role: 'mentor' ,
                    department: reqtingUser.department
                }).select('-password');
                
                return res.status(200).json(users);
            }

            return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const calcUser = async (req, res) => {
        try {
            let filter = {};
            if (req.query.userId) {
                if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
                    return res.status(400).json({ error: "Invalid user ID" });
                }
                filter._id = req.query.userId;
            }
    
            const users = await User.find(filter);
            const countUsers = users.length;
    
            res.status(200).json({ countUsers, users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    


    const denyMentor = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (user.role !== 'mentor') {
                return res.status(400).json({ error: 'User is not a mentor' });
            }

            user.isApproved = false;
            await user.save();

            res.status(200).json({ message: 'Mentor approval denied' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const toggleBanUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.isBanned = !user.isBanned;
            await user.save();

            res.status(200).json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'}` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    const userByDep = async (req, res) => {
        try {
        const { department } = req.params;
    
        if (!department) {
            return res.status(400).json({ message: "No department provided" });
        }
    
        const mongoose = require("mongoose");
    
        console.log("Received department:", department);
    
        let depId;
        try {
            depId = new mongoose.Types.ObjectId(department)
        } catch (error) {
            return res.status(400).json({ message: "Invalid department format" });
        }
    
    console.log("Converted ObjectId:", depId);
    
        const userbyDepartment = await User.find({ department : depId  }).populate("department");
    if(!userbyDepartment){
        return res.status(400).json({message : " couldnt geet u by d "})
    }else(
        console.log('here are the results', userbyDepartment)
    )
        console.log("query result:", userbyDepartment);
    
        res.status(200).json(userbyDepartment);
        } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ error: error.message });
        }
    };

    const logout = async (req , res) =>{
        try {
            res.status(200).json({message: 'Logged out successfully'})
        }catch(error){
            res.status(500).json({error:error.message})
        }
    }

    module.exports = {
        signUp,
        login,
        denyMentor,
        approveUsers,
        getAccountsByApprovalStatus,
        getCurrentUser,
        getUserById,
        getAllUsers,
        logout,
        achievements,
        calcUser,
        userByDep,
        toggleBanUser
    };
