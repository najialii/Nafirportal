const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const skills  = [
    "Software Development",
    "Marketing",
    "Business Strategy",
    "Finance",
    "Data Science",
    "Cybersecurity",
    "Graphic Design"
]
const mentorSessionsSchema = new Schema({
    mentorImage: {
        type: String, 
        required: true
    },
    mentorName: {
        type: String,
        required: true
    },
    mentorExpertise: {
        type: [String], 
        required: true,
        validate: {
            validator: function (skills) {
                return skills.every(skill => allSkills.includes(skill) || typeof skill === "string");
            },
            message: "Some skills are not allowed."
        }
    },
    aboutMentor: {
        type: String, 
        required: true
    },
    availableTimes: {
        type: [String], 
        required: true
    },
    requests: [{
        menteeName: String,
        requestedTime: String, 
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('mentorSessions', mentorSessionsSchema);
