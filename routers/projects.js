const express = require("express");
const { createProjects } = require("../collections/projects/createproject");
const { verifyToken } = require("../collections/middleware/verifyToken");
const { getProjects } = require("../collections/projects/getProjects");
const {
  getProjectsByFilter,
} = require("../collections/projects/getprojectbyfilter");
const Router = express.Router();

Router.post("/user/create", verifyToken, createProjects);
Router.post("/user/gitrepo", verifyToken, getProjects);
Router.post("/user/search", verifyToken, getProjectsByFilter);
Router.post("/user/remove", verifyToken, getProjectsByFilter);

module.exports = Router;
