const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema (
{
    title : {
        type: String, 
        required :'true'
    }, 
    constent : {
        type: String, 
        required :'true'
    }, 
    img : {
        type: String, 
        required :'true'
    }, 
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required :'true'
    }, 
    createdAt:{
        type : Date , 
        default: Date.now
    }

})
module.exports = mongoose.model('Blogs',blogSchema)