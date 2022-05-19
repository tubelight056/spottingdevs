const express = require("express");
const { verifyToken } = require("../collections/middleware/verifyToken");
const { upadteUserDetails } = require("../collections/updateDetails");
const Router = express.Router();

Router.post("/user/detail", verifyToken, upadteUserDetails);

module.exports = Router;
