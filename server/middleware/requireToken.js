const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Counselor = mongoose.model("Counselor");
const { jwtkey } = require("../keys");

module.exports = (req, res, next) => {
  
  const { authorization } = req.headers;
  //authorization === Bearer qwertyuiop
  if (!authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtkey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in 2" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    const { counselorId } = payload;
    const counselor = await Counselor.findById(counselorId);
    req.counselor = counselor;
    global.user_id = userId;
    global.counselor_id = counselorId;
    next();
  });
};

