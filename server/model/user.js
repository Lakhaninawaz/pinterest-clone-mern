const mongoose = require("mongoose")

const plm = require('passport-local-mongoose');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String, 
    },
    contact: {
        type: Number
    },
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
})

userSchema.plugin(plm);

const User = mongoose.model('user', userSchema);
module.exports = User;