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

  DateOfBirth: {
    type: String,
    require: true,
  },
  profileImgUrl: {
    type: String,
    require: true,
    default:
      "https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar-600x600.png",
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
  Score: {
    blogscore: {
      type: Number,
      default: 0,
    },
    blogCount: {
      type: Number,
      default: 0,
    },
    projectscore: {
      type: Number,
      default: 0,
    },
    projectCount: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
});

const User = mongoose.model("User", userDetails);

module.exports = { User };
