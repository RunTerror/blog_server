const middleware = require("../middleware");
const Profile = require('../models/profile_model');
const express=require('express');
const router = express.Router();


router.route("/add").post(middleware.checkToken, (req, res)=>{
    const newProfile=Profile({
        userName: req.body.userName,
        name: req.body.name,
        DOB: req.body.DOB,
        titleLine: req.body.titleLine,
        proffesion: req.body.proffesion,
        about: req.body.proffesion
    });
    newProfile.save().then((result) => {
        return res.json("New Profile Created Succesfully");
    }).catch((err) => {
        return res.json({err: err,
        msg: "username already exist"});
    });;
})
router.route("/anything").get((req, res)=>{
    res.json("done");
});

module.exports=router;