const express = require("express");
const { createBlogs } = require("../collections/blogs/createBlogs");
const { getBlogs } = require("../collections/blogs/getBlogs");
const { getBlogssByFilter } = require("../collections/blogs/getBlogsByFilter");
const { GetMediumPost } = require("../collections/medium/getPost");
const { verifyToken } = require("../collections/middleware/verifyToken");
const Router = express.Router();

Router.post("/user/create", verifyToken, createBlogs);
Router.post("/user/devto", verifyToken, getBlogs);
Router.post("/user/search", verifyToken, getBlogssByFilter);
Router.post("/user/medium/posts", verifyToken, GetMediumPost);
module.exports = Router;
