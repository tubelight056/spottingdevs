const express = require("express");
const { getDetails } = require("../collections/getDetails");
const {
  getParticularlySkilled,
} = require("../collections/getParticularSkilled");
const { verifyToken } = require("../collections/middleware/verifyToken");
const Router = express.Router();

Router.post("/alldetails", verifyToken, getDetails);
Router.post("/user/skills", verifyToken, getParticularlySkilled);

module.exports = Router;
