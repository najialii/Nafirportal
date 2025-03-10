const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email format']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['mentee', 'mentor', 'admin'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        validate: {
            validator: function (v) {
                return v ? validator.isURL(v) : true;
            },
            message: props => `${props.value} is not a valid URL`
        }
    },
    country: {
        type: String
    },
    skills: {
        type: [String]
    },
    about: {
        type: String
    },
    linkedinProfile: {
        type: String,
        validate: {
            validator: function (v) {
                return v ? validator.isURL(v) : true;
            },
            message: props => `${props.value} is not a valid LinkedIn URL`
        }
    },
    experienceYears: {
        type: Number,
        min: 0
    },
    industry: {
        type: String
    },
    availability: {
        type: Boolean,
        default: true
    },
    following: [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }],
    followers: [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }],
    isApproved :{
     type:Boolean, 
     default:function() {
        return this.role !== 'mentor'; 
    }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to enforce req roles 
userSchema.pre('validate', function (next) {
    if (this.role == 'mentor') {
        
        if (!this.profilePicture) this.invalidate('profilePicture', 'Path `profilePicture` is required.');
    }
    // if (this.role === 'mentee' && !this.country) {
    //     this.invalidate('country', 'Path `country` is required.');
    // }
    if (this.role === 'mentor' && (!this.skills || this.skills.length === 0)) {
        this.invalidate('skills', 'Path `skills` is required.');
    }
    next();
});


module.exports = mongoose.model('User', userSchema);
