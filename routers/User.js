const express = require("express");
const { getAllUser } = require("../collections/getallUser");
const { verifyToken } = require("../collections/middleware/verifyToken");
const Router = express.Router();

Router.post("/user/search", verifyToken, getAllUser);

module.exports = Router;
