const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  meeting_id: {
    type: String,
    required: true,
  },
  passcode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
 
  registeredUsers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;