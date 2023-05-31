const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const Profile = Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    name: String,
    proffesion: String,
    DOB: String,
    titleline: String,
    about: String,
    img: {
        type: String,
        default: ""
    }
}, { timeStamp: true });

module.exports=mongoose.model("Profile", Profile)