const mongoose = require("mongoose");

const projectDetails = new mongoose.Schema({
  Email: {
    type: String,
    require: true,
  },
  Tags: {
    type: Array,
  },
  Github_id: {
    type: Number,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  Full_name: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
  },
  Stargazers_count: {
    type: Number,
    require: true,
  },
  Visibility: {
    type: String,
    require: true,
  },
  Url: { type: String, require: true },
  Language: { type: String, require: true },
  HostedLink: {
    type: String,
  },
});

projectDetails.set("timestamps", true);

const Project = mongoose.model("Projects", projectDetails);

module.exports = { Project };
