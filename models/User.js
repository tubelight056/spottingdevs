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
      Degree: { type: String },
      Institution: { type: String },
      StartYear: { type: Number },
      EndYear: { type: Number },
    },
  ],
  Experience: [
    {
      CompanyName: { type: String },
      Duration: { type: Number },
      Position: { type: String },
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
    default: "Nothing",
  },
  Medium: {
    type: String,
    default: "Nothing",
  },
  Location: {
    type: Array,
    default: [0, 0],
    required: true,
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
  status: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userDetails);

module.exports = { User };
