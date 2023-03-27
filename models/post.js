const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user : String,
    post : String,
    isLiked : [
        {
                type: String
        }
    ],
    isComment : [
        {
            userId: String,
            userName: String,
            message: String
        }
    ],
    time : { type : Date, default: Date.now }
    
   
})

module.exports= mongoose.model("post", postSchema);

