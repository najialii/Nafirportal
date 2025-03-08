const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate-v2')
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
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },    
    mentorImage: {
        type: String, 
        // required: true
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
                return skills.every(skill => skills.includes(skill) || typeof skill === "string");
            },
            message: "Some skills are not allowed."
        }
    },
    aboutMentor: {
        type: String, 
        required: true
    },
    availableTimes: [{
        day: { type: String, required: true },
        times: [{ type: String, required: true }] 
    }],
    requests: [{
        menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
mentorSessionsSchema.plugin(mongosePaginate)
module.exports = mongoose.model('MentorSession', mentorSessionsSchema);
