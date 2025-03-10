const express = require('express');
const router = express.Router();
const {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  registerUser,
} = require('../controllers/activityController');

// Get all activities for a user
router.get('/:userId', getActivities);

// Create a new activity for a user
router.post('/:userId', createActivity);

// Update an activity
router.put('/:activityId', updateActivity);

// Delete an activity
router.delete('/:activityId', deleteActivity);

// Register a user for an activity
router.post('/:activityId/register', registerUser);

module.exports = router;