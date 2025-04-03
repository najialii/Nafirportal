const Activity = require('../models/activityModel');
const User = require('../models/userModle'); 
// Ensure the User model is imported
const { ObjectId } = require('mongodb');

const mongoose = require('mongoose');


const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createActivity = async (req, res) => {
  const { description, name,userId, departmentId, location, link, meeting_id, passcode, date, time, status } = req.body;
  // const userId = req.user.id
if(!departmentId){
  return res.status(404).json({message: 'user is no depart '})
}
  const activity = new Activity({
    userId,  
    departmentId,
    description,
    name,
    location,
    link, 
    meeting_id,
    passcode,
    date,
    time,
    status,
  });

  try {
    const newActivity = await activity.save();
    res.status(201).json({
      message: 'Activity created successfully',
      activity: newActivity
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an activity
const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    activity.description = req.body.description || activity.description;
    activity.name = req.body.name || activity.name;
    activity.departmentId = req.body.departmentId || activity.departmentId;
    activity.location = req.body.location || activity.location;
    activity.link = req.body.link || activity.link;
    activity.meeting_id = req.body.meeting_id || activity.meeting_id;
    activity.passcode = req.body.passcode || activity.passcode;
    activity.date = req.body.date || activity.date;
    activity.time = req.body.time || activity.time;
    const updatedActivity = await activity.save();
    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an activity
const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId);
    if (!activity) {
       res.status(404).json({ message: 'Activity not found' });
       return console.log('no activity found')

    }
   
    const deletedActivity = await Activity.deleteOne({ _id: req.params.activityId });

    res.status(200).json(deletedActivity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register a user for an activity
const registerUser = async (req, res) => {
  const { userId, whatsappNumber, reason } = req.body;
  try {
    const activity = await Activity.findById(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const userAlreadyRegistered = activity.registeredUsers.some(user => user.userId.toString() === userId);
    if (!userAlreadyRegistered) {
      const userRegistration = { userId, whatsappNumber, reason };
      activity.registeredUsers.push(userRegistration);
      await activity.save();

      // Populate the user data
      const user = await User.findById(userId).select('name email');
      res.status(200).json({
        message: 'User registered successfully',
        user: {
          userId,
          name: user.name,
          email: user.email,
          whatsappNumber,
          reason,
          link: activity.link,
          meeting_id: activity.meeting_id,
          passcode: activity.passcode
        }
      });
    } else {
      res.status(400).json({ message: 'User already registered' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all activities
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching activities' });
  }

};

const getActDep = async (req, res) => {
  try {
    const { departmentId } = req.params;

    if (!departmentId) {
      return res.status(400).json({ message: "No departmentId provided" });
    }

    const mongoose = require("mongoose");

    console.log("Received departmentId:", departmentId);

    let depId;
    try {
      depId = new mongoose.Types.ObjectId(departmentId);
    } catch (error) {
      return res.status(400).json({ message: "Invalid departmentId format" });
    }

    console.log("Converted ObjectId:", depId);

    const actDep = await Activity.find({ departmentId: depId });

    console.log("Query Result:", actDep);

    res.status(200).json(actDep);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  getActDep,
  registerUser,
  getAllActivities,
};