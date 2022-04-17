const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
    unique: true,
  },
  // Password: {
  //   type: String,
  //   require: true,
  // },
  DateOfBirth: {
    type: String,
    require: true,
  },
  profileImgUrl: {
    type: String,
    require: true,
  },
  Skills: {
    type: Array,
    required: true,
  },
  Education: [
    {
      Degree: { type: String, required: true },
      Institution: { type: String, required: true },
      StartYear: { type: Number, required: true },
      EndYear: { type: Number, required: true },
    },
  ],
  Experience: [
    {
      CompanyName: { type: String, required: true },
      Duration: { type: Number, required: true },
      Position: { type: String, required: true },
      Description: { type: String },
    },
  ],
  Portfolio: {
    type: String,
  },
  Github: {
    type: String,
    required: true,
  },
  Devto: {
    type: String,
  },
  Medium: {
    type: String,
  },
  Location: {
    type: String,
  },
  Visited: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userDetails);

module.exports = { User };
