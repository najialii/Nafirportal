const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',  // Reference to the Conversation model
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    text: {
        type: String,
        required: true
    }
}

,{timestamps : true}

);

module.exports = mongoose.model('Message', MessageSchema);