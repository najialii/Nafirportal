const express = require('express');
const router = express.Router();
const {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  registerUser,
  getAllActivities, // Import the new controller function
} = require('../controllers/activityController');

// Get all activities for a user
router.get('/', getActivities);

// Create a new activity for a user
router.post('/', createActivity);

// Update an activity
router.put('/:activityId', updateActivity);

// Delete an activity
router.delete('/:activityId', deleteActivity);

// Register a user for an activity
router.post('/:activityId/register', registerUser);

// Get all activities
router.get('/', getAllActivities); // Add the new route

module.exports = router;