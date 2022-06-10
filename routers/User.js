const express = require("express");
const { deleteUser } = require("../collections/DeleteUser");
const { getAllUser } = require("../collections/getallUser");
const { verifyToken } = require("../collections/middleware/verifyToken");
const Router = express.Router();

Router.post("/user/search", verifyToken, getAllUser);
Router.get("/user/delete", verifyToken, deleteUser);

module.exports = Router;
