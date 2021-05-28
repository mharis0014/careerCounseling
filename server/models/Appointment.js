const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const appointmentSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  counselorEmail: {
    type: String,
    required: true,
  },
  counselorName: {
    type: String,
    required: true,
  },
  counselorId: {
    type: String,
    required: true,
  },
  counselorImage: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: String,
  },
  pakage: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    requied: true,
  },
});

mongoose.model("Appointment", appointmentSchema);
