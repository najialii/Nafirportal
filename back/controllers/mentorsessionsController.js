const { default: mongoose } = require('mongoose');
const MentorSession = require('../models/mentorSessionsModel');


const getMentorSessions = async (req, res) => {
    try {
        const sessions = await MentorSession.find({}).sort({ createdAt: -1 });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getSingleMentorSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No results found' });
    }
    
    try {
        const session = await MentorSession.findById(id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createMentorSession = async (req, res) => {
    const { mentorImage, mentorName, mentorExpertise, aboutMentor, availableTimes } = req.body;

    try {
        const session = await MentorSession.create({
            mentorImage,
            mentorName,
            mentorExpertise,
            aboutMentor,
            availableTimes
        });
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const updateMentorSession = async (req, res) => {
    const { id } = req.params;
    const { menteeName, requestedTime, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No results found' });
    }

    try {
        const session = await MentorSession.findById(id);

        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }


        const request = session.requests.find(req => req.requestedTime === requestedTime && req.menteeName === menteeName);
        if (request) {
            request.status = status;
        } else {
            return res.status(404).json({ error: 'Request not found' });
        }

        await session.save();
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteMentorSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No results found' });
    }

    try {
        const session = await MentorSession.findByIdAndDelete(id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMentorSession,
    getMentorSessions,
    getSingleMentorSession,
    updateMentorSession,
    deleteMentorSession
};
