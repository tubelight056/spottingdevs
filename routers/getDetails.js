const express = require("express");
const { getDetails } = require("../collections/getDetails");
const { verifyToken } = require("../collections/middleware/verifyToken");
const Router = express.Router();

Router.post("/alldetails", verifyToken, getDetails);

module.exports = Router;
