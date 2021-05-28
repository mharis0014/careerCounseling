const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
    ratingIndex: {
        type: String,
        required : true
    },
    feedback: {
        type: String,
      required: true,  
    }
});

mongoose.model("Rating", ratingSchema);
