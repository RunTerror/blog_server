const middleware = require("../middleware");
const { route } = require("./user");
const router=express.Router();

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
        return res.statusCode(400).json({err: err});
    });;
})
router.route("/anything").get((req, res)=>{
    res.json("done");
});

module.exports=router;