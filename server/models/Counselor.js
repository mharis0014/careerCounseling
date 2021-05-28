const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var fs = require('fs');
const counselorSchema = new mongoose.Schema({
  fileList: {
    data: Buffer,
    contentType: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required :true
  },
  ratingAndFeedback: {
    type: Array,
    required: true,
  },
  //For Video Chat
  sessionid: {
    type: String,
  },
  tokenid: {
    type: String,
  },
});

counselorSchema.pre("save", function (next) {
  const counselor = this;
  if (!counselor.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(counselor.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      counselor.password = hash;
      next();
    });
  });
});

counselorSchema.methods.comparePassword = function (candidatePassword) {
  const counselor = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, counselor.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

mongoose.model("Counselor", counselorSchema);
