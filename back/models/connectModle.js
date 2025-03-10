


const mongoose = require("mongoose")



const connectSchema = new mongoose.Schema({
    follower: {
        type : Schema.Types.objectId, 
        ref: 'user'
    }, 
    followee:{
        typo:Schema.Types.objectId, 
        ref:'user'
    }
},{
    timestamps:{createdAt:'createdAt', updatedAt: 'updatedAt'}
})


module.exports = mongoose.model("Connect", connectSchema)