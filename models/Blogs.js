const mongoose = require("mongoose");

const blogDetails = new mongoose.Schema({
  Email: {
    type: String,
    require: true,
  },
  blogId: {
    type: Number,
    require: true,
    unique: true,
  },
  Title: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Date: {
    type: String,
    require: true,
  },
  positive_count: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  tags: {
    type: Array,
    require: true,
  },
});

blogDetails.set("timestamps", true);

const Blog = mongoose.model("Blogs", blogDetails);

module.exports = { Blog };
