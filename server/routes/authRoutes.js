const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { jwtkey } = require("../keys");
var OpenTok = require("opentok");
const router = express.Router();
const User = mongoose.model("User");
const Counselor = mongoose.model("Counselor");
const Appointment = mongoose.model("Appointment");
const Admin = mongoose.model("Admin");
const Rating = mongoose.model("Rating");
const allusers_video = [];

router.post("/counselorSignup", async (req, res) => {
  console.log("counselor signup request received");
  const {
    fileList,
    name,
    email,
    education,
    about,
    password,
    status,
    ratingAndFeedback,
  } = req.body;
  console.log(req.body.name);
  try {
    const counselor = new Counselor({
      fileList,
      name,
      email,
      password,
      education,
      about,
      status,
      ratingAndFeedback,
    });
    await counselor.save();
    const token = jwt.sign({ counselorId: counselor._id }, jwtkey);
    console.log({ token });
    res.send({ token });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

router.get("/getRatings", function (req, res) {
  Rating.find({}, function (err, doc) {
    if (err) return next();
    res.send(doc);
  });
});

router.get("/getPayments/confirmed", function (req, res) {
  Appointment.find({ status: "confirmed" }, function (err, doc) {
    if (err) return next(err);
    var newInfo = [];
    var newDoc = {
      appointmentId: "",
      userId: "",
      userName: "",
      userEmail: "",
      counselorEmail: "",
      counselorName: "",
      counselorId: "",
      counselorImage: "",
      date: "",
      pakage: "",
      status: "",
      price: "",
    };

    for (i = 0; i < doc.length; i++) {
      newDoc = {
        appointmentId: doc[i].id,
        userId: doc[i].userID,
        userName: doc[i].userName,
        userEmail: doc[i].userEmail,
        counselorEmail: doc[i].counselorEmail,
        counselorName: doc[i].counselorName,
        counselorId: doc[i].counselorId,
        counselorImage: doc[i].counselorImage.data + "".toString("ascii"),
        date: doc[i].date,
        pakage: doc[i].pakage,
        status: doc[i].status,
        price: doc[i].price,
      };
      newInfo[i] = newDoc;
    }

    res.send(newInfo);
    console.log("Confirmed Payments Sent");
  });
});

router.get("/getSpecificCounselorPayment/:counselorId", function (req, res) {
  console.log(
    "I have reche specific counselor route to get appointments of that counselor"
  );
  Appointment.find(
    { counselorId: req.params.counselorId.toString(), status: "confirmed" },
    function (err, doc) {
      if (err) return next(err);
      console.log(doc);
      var newInfo = [];
      var newDoc = {
        userName: "",
        userEmail: "",
        date: "",
        pakage: "",
        status: "",
        price: "",
      };

      for (i = 0; i < doc.length; i++) {
        newDoc = {
          userName: doc[i].userName,
          userEmail: doc[i].userEmail,
          date: doc[i].date,
          pakage: doc[i].pakage,
          status: doc[i].status,
          price: doc[i].price,
        };
        newInfo[i] = newDoc;
      }

      res.send(newInfo);
      console.log("Specific Counselor's Payments Sent");
    }
  );
});

router.post("/userSignup", async (req, res) => {
  console.log(req.body.name, req.body.email, req.body.password);
  console.log("user signup request received");
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtkey);
    console.log(token);
    res.send({ token });
  } catch (err) {
    return res.send(err);
  }
});

router.post("/savetoken", async (req, res) => {
  console.log("save token request received");
  const API_KEY = "47167814";
  const API_SECRET = "94e58ac16e2d3efd4a544e2431645f169a8aca2f";
  var opentok = new OpenTok(API_KEY, API_SECRET);

  //Generate a basic session. Or you could use an existing session ID.
  var sessionId;
  opentok.createSession({}, function (error, session) {
    if (error) {
      console.log("Error creating session:", error);
    } else {
      sessionId = session.sessionId;
      console.log("Session ID: " + sessionId);
      var token = opentok.generateToken(sessionId);
      console.log("Token is " + token);
      const { useremail, consoleremail } = req.body;
      console.log("useremail " + useremail);
      console.log("consoleremail " + consoleremail);
      allusers_video.push({
        email: useremail,
        tokenid: token,
        sessionId: sessionId,
      });
      res.send(allusers_video);
    }
  });
});

router.put("/updateAppointment/:id", async (req, res) => {
  console.log("I am in update route");
  const id = req.params.id;
  console.log(id);
  await Appointment.updateOne({ _id: id }, req.body);
  res.send({ Confirmation: "Record Updated" });
});

router.put("/updateCounselor/:id", async (req, res) => {
  console.log("I am in update counselor route");
  const id = req.params.id;
  console.log(req.body);
  console.log(id);

  await Counselor.updateOne({ _id: id }, req.body);
  res.send({ Confirmation: "Record Updated" });
});

router.get("/getallusers_videoid", async (req, res) => {
  console.log(JSON.stringify(allusers_video));

  return res.send(JSON.stringify(allusers_video));
});
router.post("/updatechatid", async (req, res) => {
  console.log("req received in chat");
  const { chatid, email } = req.body;
  try {
    await User.update({ email: email }, { $set: { chatid: chatid } });
  } catch (err) {
    return res.send(err);
  }
});
router.post("/updatechatid_counsoler", async (req, res) => {
  console.log("req received in chat");
  const { chatid, email } = req.body;
  try {
    await Counselor.update({ email: email }, { $set: { chatid: chatid } });
  } catch (err) {
    console.log(err);
    console.log("Catch");
    return res.send(err);
  }
});

router.get("/getCounselorData/requested", function (req, res) {
  Counselor.find({ status: "requested" }, function (err, counselor) {
    console.log("Request Received from Client");
    if (err) return next(err);
    var newInfo = [];
    var newCounselor = {
      imageData: "",
      name: "",
      email: "",
      id: "",
      education: "",
      about: "",
    };

    for (i = 0; i < counselor.length; i++) {
      newCounselor = {
        imageData: counselor[i].fileList.data + "".toString("ascii"),
        name: counselor[i].name,
        email: counselor[i].email,
        id: counselor[i].id,
        education: counselor[i].education,
        about: counselor[i].about,
      };
      newInfo[i] = newCounselor;
    }
    res.send(newInfo);
  });
  console.log("Done");
});

router.get("/auth", auth, async (req, res) => {
  //console.log("simple auth has been called");
  res.send(true);
});

router.get("/getCounselorData/confirmed", function (req, res) {
  Counselor.find({ status: "confirmed" }, function (err, counselor) {
    console.log("Request Received from Client");
    if (err) return next(err);
    var newInfo = [];
    var newCounselor = {
      imageData: "",
      name: "",
      email: "",
      id: "",
      education: "",
      about: "",
      ratingAndFeedback: "",
    };

    for (i = 0; i < counselor.length; i++) {
      newCounselor = {
        imageData: counselor[i].fileList.data + "".toString("ascii"),
        name: counselor[i].name,
        email: counselor[i].email,
        id: counselor[i].id,
        education: counselor[i].education,
        about: counselor[i].about,
        ratingAndFeedback: counselor[i].ratingAndFeedback,
      };
      newInfo[i] = newCounselor;
    }

    res.send(newInfo);
    console.log("res send!!!!!!!");
  });
  console.log("Done");
});

router.get("/getSpecificCounselorFeedback/:counselorId", function (req, res) {
  Counselor.findOne({ _id: req.params.counselorId }, function (err, counselor) {
    console.log("Getting Specific Counselor Rating and feedback");
    if (err) return next(err);
    res.send(counselor);
    console.log("Specific Counselor rating and feedback Sent");
  });
});

router.get("/getUserData", function (req, res) {
  User.find({}, function (err, user) {
    console.log("Request Received from Client");
    if (err) return next(err);
    var newInfo = [];
    var newUser = {
      name: "",
      email: "",
      id: "",
    };

    for (i = 0; i < user.length; i++) {
      newUser = {
        name: user[i].name,
        email: user[i].email,
        id: user[i].id,
      };
      newInfo[i] = newUser;
    }
    res.send(newInfo);
  });
});

router.get("/getCounselorData/:counselorId", function (req, res) {
  console.log(" i am in coulselor sidebar info route");
  Counselor.findOne({ _id: req.params.counselorId }, function (err, counselor) {
    var newCounselor = {
      name: counselor.name,
      email: counselor.email,
      counselorImage: counselor.fileList.data + "".toString("ascii"),
    };
    res.send(newCounselor);
  });
});

router.get("/getAppointments", function (req, res) {
  Appointment.find({}, function (err, appointments) {
    console.log("Get All the Appointments");

    if (err) return next(err);
    var newInfo = [];
    var newAppointment = {
      appointmentId: "",
      userId: "",
      userName: "",
      userEmail: "",
      counselorEmail: "",
      counselorName: "",
      counselorId: "",
      counselorImage: "",
      date: "",
      pakage: "",
      price: "",
    };

    for (i = 0; i < appointments.length; i++) {
      newAppointment = {
        appointmentId: appointments[i].id,
        userId: appointments[i].userID,
        userName: appointments[i].userName,
        userEmail: appointments[i].userEmail,
        counselorEmail: appointments[i].counselorEmail,
        counselorName: appointments[i].counselorName,
        counselorId: appointments[i].counselorId,
        counselorImage:
          appointments[i].counselorImage.data + "".toString("ascii"),
        date: appointments[i].date,
        pakage: appointments[i].pakage,
        price: appointments[i].price,
      };
      newInfo[i] = newAppointment;
    }
    res.send(newInfo);
  });
});

router.get("/getAppointments/confirmed", function (req, res) {
  Appointment.find({ status: "confirmed" }, function (err, appointment) {
    var newInfo = [];
    var newAppointment = {
      appointmentId: "",
      userId: "",
      userName: "",
      userEmail: "",
      counselorEmail: "",
      counselorName: "",
      counselorId: "",
      counselorImage: "",
      date: "",
      pakage: "",
      status: "",
      price: "",
    };

    for (i = 0; i < appointment.length; i++) {
      newAppointment = {
        appointmentId: appointment[i].id,
        userId: appointment[i].userID,
        userName: appointment[i].userName,
        userEmail: appointment[i].userEmail,
        counselorEmail: appointment[i].counselorEmail,
        counselorName: appointment[i].counselorName,
        counselorId: appointment[i].counselorId,
        counselorImage:
          appointment[i].counselorImage.data + "".toString("ascii"),
        date: appointment[i].date,
        pakage: appointment[i].pakage,
        status: appointment[i].status,
        price: appointment[i].price,
      };
      newInfo[i] = newAppointment;
    }

    res.send(newInfo);
    console.log("Confirmed Appointments Sent");
  });
});

router.get("/getAppointments/pending", function (req, res) {
  Appointment.find({ status: "pending" }, function (err, doc) {
    if (err) return next(err);
    var newInfo = [];
    var newDoc = {
      appointmentId: "",
      userId: "",
      userName: "",
      userEmail: "",
      counselorEmail: "",
      counselorName: "",
      counselorId: "",
      counselorImage: "",
      date: "",
      pakage: "",
      price: '',
      status: "",
    };

    for (i = 0; i < doc.length; i++) {
      newDoc = {
        appointmentId: doc[i].id,
        userId: doc[i].userID,
        userName: doc[i].userName,
        userEmail: doc[i].userEmail,
        counselorEmail: doc[i].counselorEmail,
        counselorName: doc[i].counselorName,
        counselorId: doc[i].counselorId,
        counselorImage: doc[i].counselorImage.data + "".toString("ascii"),
        date: doc[i].date,
        pakage: doc[i].pakage,
        price: doc[i].price,
        status: doc[i].status,
      };
      newInfo[i] = newDoc;
    }

    res.send(newInfo);
    console.log("Pending Appointments Sent");
  });
});

router.get("/getUserAppointments/:userId", function (req, res) {
  console.log("I AM IN user aPPOITMENT ROUTE");
  const id = req.params.userId;
  Appointment.find(
    { userID: id, status: "confirmed" },
    function (err, userAppointments) {
      if (err) return next();
      var newAppointmentInfo = [];
      var newAppointment = {
        counselorName: "",
        counselorEmail: "",
        counselorImage: "",
        date: "",
        status: "",
        pakage: "",
      };

      for (i = 0; i < userAppointments.length; i++) {
        newAppointment = {
          counselorName: userAppointments[i].counselorName,
          counselorEmail: userAppointments[i].counselorEmail,
          counselorImage:
            userAppointments[i].counselorImage.data + "".toString("ascii"),
          date: userAppointments[i].date,
          status: userAppointments[i].status,
          pakage: userAppointments[i].pakage,
        };
        newAppointmentInfo[i] = newAppointment;
      }
      res.send(newAppointmentInfo);
    }
  );
});

router.get("/getCounselorAppointments/:counselorId", function (req, res) {
  console.log("I reached counselor appoointment route");
  const id = req.params.counselorId;
  Appointment.find(
    { counselorId: id, status: "confirmed" },
    function (err, userAppointments) {
      if (err) return next();
      var newAppointmentInfo = [];
      var newAppointment = {
        userName: "",
        userEmail: "",
        date: "",
        status: "",
        pakage: "",
      };

      for (i = 0; i < userAppointments.length; i++) {
        newAppointment = {
          userName: userAppointments[i].userName,
          userEmail: userAppointments[i].userEmail,
          date: userAppointments[i].date,
          status: userAppointments[i].status,
          pakage: userAppointments[i].pakage,
        };
        newAppointmentInfo[i] = newAppointment;
      }
      res.send(newAppointmentInfo);
    }
  );
});

router.post("/appointment", async (req, res) => {
  console.log("Appointment Request Received");
  console.log("userEmail: " + req.body.userEmail);
  console.log("counselorEmail: " + req.body.counselorEmail);
  console.log("date: " + req.body.date);
  console.log("package: " + req.body.pakage);
  console.log("price: " + req.body.price);
  console.log("userId: " + req.body.userID);
  console.log("cousnelorId: " + req.body.counselorId);
  console.log("username: " + req.body.userName);

  const {
    userID,
    userName,
    userEmail,
    counselorEmail,
    counselorName,
    counselorId,
    counselorImg,
    date,
    pakage,
    price,
    status,
  } = req.body;
  counselorImage = {
    contentType: "image/jpg",
    data: counselorImg,
  };
  try {
    const appointment = new Appointment({
      userID,
      userName,
      userEmail,
      counselorEmail,
      counselorName,
      counselorId,
      counselorImage,
      date,
      pakage,
      price,
      status,
    });
    await appointment.save();
    res.send({ status: "booked" });
    console.log("Success");
  } catch (e) {
    return res.status(422).send(e);
  }
});

router.get("/getRecomended", function (req, res) {
  console.log("counselor recommendation request received");
  Counselor.find({}, function (err, counselor) {
    if (err) return next(err);
    var responseArr = [];
    var recomendationsArr = {};
    for (var i = 0; i < counselor.length; i++) {
      if (counselor[i].ratingAndFeedback.length > 0) {
        var total = 0;
        for (var j = 0; j < counselor[i].ratingAndFeedback.length; j++) {
          var num = counselor[i].ratingAndFeedback[j].ratingIndex;
          var num2 = parseInt(num);
          total = Math.round((total + num2) / ++j);
        }
        recomendationsArr["ratingIndex"] = total;
        total = 0;
      } else {
        recomendationsArr["ratingIndex"] = "Not Rated Yet";
      }
      recomendationsArr["counselorName"] = counselor[i].name;
      recomendationsArr["counselorEmail"] = counselor[i].email;
      recomendationsArr["counselorImage"] =
        counselor[i].fileList.data + "".toString("ascii");
      responseArr.push(recomendationsArr);
      recomendationsArr = {};
    }
    res.send(responseArr);
    console.log("Confirmed Appointments Sent");
  });
});

router.delete("/deleteAppointment:id", function (req, res) {
  console.log("Delete Appointment Request Received");
  const id = req.params.id;
  console.log(id);
  Appointment.findByIdAndDelete({ _id: id }, function (err, appointment) {
    if (err) return next(err);
    console.log("Deleted Appointment ", appointment);
  });
  res.send({ Status: "Deleted" });
});

router.post("/updateAppointment:id", async (req, res) => {
  console.log("I am in update route");
  const id = req.params.id;
  console.log(id);
  await Appointment.updateOne({ _id: id }, req.body);
  res.send({ Confirmation: "Record Updated" });
});

router.delete("/deleteUser:id", function (req, res) {
  console.log("Delete Appointment Request Received");
  const id = req.params.id;
  console.log(id);
  User.findByIdAndDelete({ _id: id }, function (err, user) {
    if (err) return next(err);
    console.log("Deleted User ", user);
  });
  res.send({ Status: "Deleted" });
});

router.delete("/deleteCounselor:id", function (req, res) {
  console.log("Delete Appointment Request Received");
  const id = req.params.id;
  console.log(id);
  Counselor.findByIdAndDelete({ _id: id }, function (err, counselor) {
    if (err) return next(err);
    console.log("Deleted Counselor ", counselor);
  });
  res.send({ Status: "Deleted" });
});

router.put("/ratings/:counselorId", async (req, res) => {
  console.log(req.body);
  const id = req.params.counselorId;
  console.log("in ratings route");
  const counselor = await Counselor.findById({ _id: id });
  var name = counselor.name;
  var ratingAndFeedback = counselor.ratingAndFeedback;
  var counselorRatings = {
    userName: req.body.userName,
    feedback: req.body.feedback,
    ratingIndex: req.body.ratingIndex,
    counselorName: name,
  };
  ratingAndFeedback.push(counselorRatings);

  const updated = await Counselor.updateOne(
    { _id: id },
    { ratingAndFeedback: ratingAndFeedback }
  );
  console.log(updated);
  res.send({ status: "rating submitted" });
});

router.post("/counselorSignin", async (req, res) => {
  console.log("I am in counselor Sign in route. Whats up!");
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email and password1" });
  }
  const counselor = await Counselor.findOne({ email });
  if (!counselor) {
    return res.status(422).send({ error: "coudnt find counselor" });
  }
  try {
    await counselor.comparePassword(password);
    const token = jwt.sign({ counselorId: counselor._id }, jwtkey);
    const counselorId = counselor.id;
    console.log(token);
    console.log(counselorId);
    const storageData = [counselorId, token];
    res.send(storageData);
  } catch (err) {
    return res.status(422).send({ error: "must provide email or password3" });
  }
});

router.post("/userSignin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "provide both" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "user doesnt exist" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtkey);
    const userEmail = user.email;
    const userId = user.id;
    const userName = user.name;
    console.log(userEmail, userId, userName, token);
    const storageData = [userId, userName, userEmail, token];
    res.send(storageData);
  } catch (err) {
    return res.status(422).send({ error: "I am in catch" });
  }
});

router.post("/adminSignin", async (req, res) => {
  console.log("admin lognin request Received");
  console.log(req.body.email, req.body.password);
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("provide credentials");
    return res.status(422).send({ error: "must provide email and password1" });
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.log("coudlnt find user");
    return res.status(422).send({ error: "This user Doesn't Exist" });
  }
  try {
    console.log(admin.password);
    console.log("break point 1");
    await admin.comparePassword(password);

    const token = jwt.sign({ adminId: admin._id }, jwtkey, {
      expiresIn: "30days",
    });
    const adminId = admin.id;
    const storageData = [adminId, token];
    res.send(storageData);
  } catch (err) {
    return res.status(422).send({ error: "Something is wrong" });
  }
});

module.exports = router;
