const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const App = express();
App.use(cors());
App.use(express.json());

const port = process.env.PORT || 5500;

const AuthRouter = require("./routers/authentication");
const GetRouter = require("./routers/getDetails");
const ProjectRouter = require("./routers/projects");
const BlogRouter = require("./routers/blogs");
mongoose.connect(process.env.API_URL).then(() => {
  App.use("/auth", AuthRouter);
  App.use("/get", GetRouter);
  App.use("/project", ProjectRouter);
  App.use("/blog", BlogRouter);
  App.listen(port, () => {
    console.log("[+] Server is listening on " + port);
  });
});
