const User = require("../models/userModle");
const mongoose = require('mongoose')

exports.followUser = async (req, res) => {
    try {
        const { uToFollow } = req.body;
        const userId = req.user ? req.user.id : req.body.userId; 
     

        if (!userId || !uToFollow) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (userId === uToFollow) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

      
        const user = await User.findById(userId);
        const userToFollow = await User.findById(uToFollow);

        console.log("User:", user); 
        console.log("User to Follow:", userToFollow); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if (!userToFollow) {
            return res.status(404).json({ message: "User to follow cannot be found" });
        }

        if (user.following.includes(userToFollow._id)) {
            return res.status(400).json({ message: "You are already following this user" });
        }

    
        user.following.push(userToFollow._id);

        userToFollow.followers.push(user._id);

        await user.save();
        await userToFollow.save();

        res.status(200).json({ message: "User followed successfully" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.getFollowers = async (req, res) => {
    try{
        const userId = req.params.userId
        console.log("Received userId:", userId);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        const user = await User.findById(userId).populate("followers", "name")

        if(!user){
            return res.status(404).json({message: "canot find user with this ID"})
        }

        res.status(200).json({followers: user.followers})

    }
    catch (error){
        res.status(500).json({ message: "server error", error: error.message})
    }
}

exports.getFollowing = async (req, res) => {
    try{
        const userId = req.params.userId

        const user = await User.findById(userId).populate("following", "name")

        if(!user){
            res.status(404).json({message : "user not found"})
        }

        res.status(200).json({following: user.following})
    } catch (error){
        res.status(500).json({message : "error" , error: error.message})
    }
}


exports.unFollow = async (req, res) =>{
    try{

        const {uToUnFollow} = req.body
        const userId = req.user ? req.user.id : req.body.userId

        if(!userId || !uToUnfollow){
            return res.status(404).json({message : " cannot find user"})
        }
        const user = await User.findById(userId)
        const userToUnFollow = await User.findById(uToUnFollow) 
        
        if (!user || !userToUnfollow) {
            return res.status(404).json({ message: "The User You Are Trying To Unfollow Cannot Be Find " });
        }
user.following = user.following.filter(id => id.toString() !== uToUnFollow)
userToUnFollow.followers = userToUnFollow.followers.filter(id => id.toString() !== userId)


await user.save()
await userToUnFollow.save()

res.status(200).json({message : "you have successfully unfollowed "})
    } catch (error){
        res.status(500).json({message : "Server Error", error : error.message})
    }
}

