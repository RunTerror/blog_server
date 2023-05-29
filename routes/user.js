const express = require("express");
const User = require('../models/user_model');
const config = require("../config");
const router = express.Router();
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");


router.route("/:username").get(middleware.checkToken, async (req, res) => {
    const user = await User.findOne({ userName: req.params.username });
    if (user != null) {
        res.json({
            user: user,
            msg: "user found"
        });
    }
    else {
        res.json({
            msg: "user not found"
        });
    }
});


router.route("/login").post(async (req, res) => {
    const user = await User.findOne({ userName: req.body.userName });
    if (user != null) {
        if ((user.userName === req.body.userName) && (user.password === req.body.password)) {
            let token = jwt.sign({ userName: req.body.userName }, config.key, { expiresIn: "24h" });
            res.json({
                token: token,
                message: "success"
            });
        }
        else {
            res.json("either username or password is wrong");
        }
    } else {
        res.json("user not found");
    }
})

router.route("/register").post((req, res) => {
    console.log("inside the register");

    var newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
    });
    newUser.save().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err);
    });;
    

});

router.route("/update/:username").patch(async (req, res) => {

    var updated = await User.findOneAndUpdate(
        { userName: req.params.username },
        req.body,
        {
            new: true
        }
    );
    if (updated != null) {
        updated.password = req.body.password;
        res.json({
            msg: "updated"
        });
    }
    else {
        res.json({
            msg: "user don't exist"
        });
    }
});

router.route("/delete/:username").delete(async function (req, res) {
    await User.deleteOne({ userName: req.params.username });
    res.json("done");
});

module.exports = router;