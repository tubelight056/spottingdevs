const express = require("express");
const { getAllUser } = require("../collections/getallUser");
const { getDetails } = require("../collections/getDetails");
const {
  getParticularlySkilled,
} = require("../collections/getParticularSkilled");
const { verifyToken } = require("../collections/middleware/verifyToken");
const Router = express.Router();

Router.post("/alldetails", verifyToken, getDetails);
Router.post("/user/skills", verifyToken, getParticularlySkilled);
Router.post("/user/all", verifyToken, getAllUser);

module.exports = Router;
