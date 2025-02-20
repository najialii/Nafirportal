const MentorSession = require("../models/mentorSessionsModel");
const MentorRequest = require("../models/menSesReq");



exports.createMentorSession = async (req, res) => {
  try {
    const { title, description, availableTimes, maxParticipants } = req.body;
    const mentorId = req.user.id; 

    const newSession = new MentorSession({
      mentorId,
      title,
      description,
      availableTimes,
      // maxParticipants,
    });

    await newSession.save();
    res.status(201).json({ message: "Mentorship session created!", session: newSession });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.requestMentorship = async (req, res) => {
  try {
    const { sessionId, preferredTime } = req.body;
    const userId = req.user.id; 

    
    const session = await MentorSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Mentorship session not found" });

    
    if (!session.availableTimes.includes(preferredTime)) {
      return res.status(400).json({ message: "Invalid time slot selected" });
    }


    const request = new MentorRequest({
      sessionId,
      userId,
      preferredTime,
      status: "pending",
    });

    await request.save();
    res.status(201).json({ message: "Mentorship request sent!", request });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getMentorshipSessions = async (req, res) => {
  try {
    const sessions = await MentorSession.find().populate("mentorId", "name");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getMentorshipRequests = async (req, res) => {
  try {
    const requests = await MentorRequest.find()
      .populate("sessionId", "title")
      .populate("userId", "name");
      
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.updateMentorshipRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await MentorRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Mentorship request not found" });

    request.status = status;
    await request.save();

    res.status(200).json({ message: `Mentorship request ${status}!`, request });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
