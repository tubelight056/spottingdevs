const express = require("express");
const { register } = require("../collections/register");
const { login } = require("../collections/Login");
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router;
