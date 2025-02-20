const mongoose = require('mongoose');

const mentorSessionRequestSchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId,
       ref: "MentorSession",
       required: true },

    userId: { type: mongoose.Schema.Types.ObjectId, 
      ref: "User", required: true }, 
    preferredTime: { type: String,
       required: true },

    status: { 
      type: String,
       enum: ["pending", "approved", "rejected"],
        default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MentorSessionRequest", mentorSessionRequestSchema);
