const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  User_Name: String,
  Password: String,
  Email: String,
  status: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Users = mongoose.model("user", UserSchema);
