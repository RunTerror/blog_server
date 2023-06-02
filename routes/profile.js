const middleware = require("../middleware");
const Profile = require('../models/profile_model');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, req.decoded.userName + ".jpg");
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter
});

router.route("/add/image").patch(middleware.checkToken, upload.single("img"), async (req, res) => {
    console.log(req.body);

    let profiledata = await Profile.findOneAndUpdate(
        { userName: req.decoded.userName },
    );
    if (req.file === null) {
        res.json("send some file");
    }
    else {
        profiledata.img = req.file.buffer;
        await profiledata.save();
        res.json({
            msg: "saved",
            profiledata: profiledata
        });
    }
});

router.route("/add").post(middleware.checkToken, (req, res) => {
    const newProfile = Profile({
        userName: req.decoded.userName,
        name: req.body.name,
        DOB: req.body.DOB,
        titleLine: req.body.titleLine,
        proffesion: req.body.proffesion,
        about: req.body.proffesion
    });
    newProfile.save().then((result) => {
        return res.status(200).json("New Profile Created Succesfully");
    }).catch((err) => {
        return res.status(400).json({
            err: err,
            msg: "username already exist"
        });
    });
})

router.route("/checkProfile").get(middleware.checkToken, async (req, res) => {
    const profile = await Profile.findOne({ userName: req.decoded.userName });
    if (profile == null) {
        res.json({
            status: false
        });
    } else {
        res.json({
            status: true
        });
    }
});
router.route("/anything").get((req, res) => {
    res.json("done");
});

module.exports = router;