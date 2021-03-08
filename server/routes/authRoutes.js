const express = require("express");
const mongoose = require("mongoose");
var fs = require("fs");
const jwt = require("jsonwebtoken");
const url = require("url");
const { jwtkey } = require("../keys");
const { Console } = require("console");
const router = express.Router();
const User = mongoose.model("User");
const Counselor = mongoose.model("Counselor");

router.post("/counselorSignup", async (req, res) => {
  const { fileList, name, email, education, about, password } = req.body;
  console.log(fileList);
  try {
    const counselor = new Counselor({
      fileList,
      name,
      email,
      education,
      about,
      password,
    });
    await counselor.save();
    const token = jwt.sign({ counselorId: counselor._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    console.log("Catch");
    return res.send(err);
  }
});

router.post("/userSignup", async (req, res) => {
  console.log("req received");
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    console.log(err);
    console.log("Catch");
    return res.send(err);
  }
});

router.get("/getData", function (req, res) {
  Counselor.find({}, function (err, doc) {
    console.log("Request Received from Client");
    if (err) return next(err);
    var newInfo = [];
    var newDoc = {
      imageData: "",
      name: "",
      email: "",
      id: "",
    };

    for (i = 0; i < doc.length; i++) {
      newDoc = {
        imageData: doc[i].fileList.data+"".toString('ascii'),
        name: doc[i].name,
        email: doc[i].email,
        id: doc[i].id,
      };
      newInfo[i] = newDoc;
    }

    res.send(newInfo);
  });
  console.log("Done");
});


router.get("/getUserData", function (req, res) {
  User.find({}, function (err, doc) {
    console.log("Request Received from Client");
    if (err) return next(err);
    var newInfo = [];
    var newDoc = {
      
      name: "",
      email: "",
      id: "",
    };

    for (i = 0; i < doc.length; i++) {
      newDoc = {
        
        name: doc[i].name,
        email: doc[i].email,
        id: doc[i].id,
      };
      newInfo[i] = newDoc;
    }

    res.send(newInfo);
    console.log("Done");
  });
  
});

router.post("/counselorSignin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email or password1" });
  }
  const counselor = await Counselor.findOne({ email });
  if (!counselor) {
    return res.status(422).send({ error: "must provide email or password2" });
  }
  try {
    await counselor.comparePassword(password);
    const token = jwt.sign({ counselorId: counselor._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "must provide email or password3" });
  }
});

router.post("/userSignin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email or password1" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "must provide email or password2" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "must provide email or password3" });
  }
  
});

module.exports = router;
