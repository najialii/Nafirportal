const Activity = require('../models/activityModel');
const User = require('../models/userModle'); 
// Ensure the User model is imported

// Get all activities for a user
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new activity for a user
const createActivity = async (req, res) => {
  const { description, name, departmentId, location, link, meeting_id, passcode, date, time, status } = req.body;
  const activity = new Activity({
    userId: req.params.userId,
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
    res.status(400).json({ message: err.message });
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
      return res.status(404).json({ message: 'Activity not found' });
    }
    await activity.remove();
    res.status(200).json({ message: 'Activity deleted' });
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

module.exports = {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  registerUser,
};