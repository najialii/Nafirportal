const MentorSession = require("../models/mentorSessionsModel");
const MentorRequest = require("../models/menSesReq");


//const MentorRequest = require("../models/mentorSessionRequest");

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

    // Log the sessionId and preferredTime to debug
    console.log('Session ID:', sessionId);
    console.log('Preferred Time:', preferredTime);

    const session = await MentorSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Mentorship session not found" });

    // Log the availableTimes to debug
    console.log('Available Times:', session.availableTimes);

    // Check if the preferredTime is in the availableTimes array
    const isValidTime = session.availableTimes.some(slot => 
      slot.times.includes(preferredTime.split(' ')[1]) && slot.day === preferredTime.split(' ')[0]
    );

    if (!isValidTime) {
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





exports.getMentorSessionsByMentor = async (req, res) => {
  try {
    const mentorId = req.user.id; // Get the mentor's ID from the request

    // Find all sessions created by this mentor
    const mentorSessions = await MentorSession.find({ mentorId }).select("_id");
    
    if (!mentorSessions.length) {
      return res.status(404).json({ message: "No mentorship sessions found for this mentor" });
    }

    // Extract session IDs
    const sessionIds = mentorSessions.map(session => session._id);

    // Find mentorship requests related to these sessions
    const requests = await MentorRequest.find({ sessionId: { $in: sessionIds } })
      .populate("sessionId", "title")
      .populate("userId", "name")
      .lean(); // Improve performance by returning plain objects

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


  