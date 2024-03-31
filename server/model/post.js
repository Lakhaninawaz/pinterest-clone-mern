const  mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, 
    }
})


const Post = mongoose.model('post', postSchema);
module.exports = Post;