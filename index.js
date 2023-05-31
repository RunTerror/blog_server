const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const URI='mongodb+srv://bansalabhishek7411:Abhi%401234@cluster0.yhnqyeu.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongodb connected");
});

const userRoute = require("./routes/user");
app.use("/user", userRoute);
app.route("/").get((req, res) => res.json("This is home page"));
const profileRoute=require("./routes/profile");
app.use("/profile", profileRoute);


const port = process.env.port || 8000;
app.listen(port, () => console.log("running at port 8000"));