const express = require("express");
const { getAllUser } = require("../collections/getallUser");
const { getDetails } = require("../collections/getDetails");
const {
  getParticularlySkilled,
} = require("../collections/getParticularSkilled");
const { getUserDetail } = require("../collections/getUserDetail");
const { verifyToken } = require("../collections/middleware/verifyToken");
const { GetParticularlyScore } = require("../collections/ParticularScore");
const Router = express.Router();

Router.post("/alldetails", verifyToken, getDetails);
Router.post("/user/skills", verifyToken, getParticularlySkilled);
Router.post("/user/all", verifyToken, getAllUser);
Router.post("/score", verifyToken, GetParticularlyScore);
Router.post("/user/detail", verifyToken, getUserDetail);

module.exports = Router;
