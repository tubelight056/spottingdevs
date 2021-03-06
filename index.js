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
const userRouter = require("./routers/User.js");
const ProjectRouter = require("./routers/projects");
const BlogRouter = require("./routers/blogs");
const { updateALLProjects } = require("./collections/AllUpdateProjects");
const { updateALLBlogs } = require("./collections/allUpdateBlogs");
const updateRouter = require("./routers/update");

mongoose.connect(process.env.API_URL).then(() => {
  App.use("/auth", AuthRouter);
  App.use("/get", GetRouter);
  App.use("/user", userRouter);
  App.use("/project", ProjectRouter);
  App.use("/blog", BlogRouter);
  App.use("/update", updateRouter);
  App.listen(port, () => {
    console.log("[+] Server is listening on " + port);
  });
  updateALLProjects();
  updateALLBlogs();
});
