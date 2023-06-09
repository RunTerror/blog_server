const mongoose=require("mongoose");


const User=mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true
    }
});

module.exports=mongoose.model("User", User);