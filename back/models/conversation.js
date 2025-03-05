const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    members: {
        type: Array
    }, 
    sender : {
        type:String
    }
}

,{timestamps : true}

);

module.exports = mongoose.model('Conversation', conversationSchema);