const { User } = require("../models/User");
const { Project } = require("../models/Projects");
const { Blog } = require("../models/Blogs");
const axios = require("axios");

require("dotenv").config();

exports.getUserDetail = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  await User.findOne(
    { _id: req.body.id },
    { Password: 0 },
    async (err, result) => {
      if (err) {
        console.log(`[-]  `, {
          error: err,
          statusMessage: "something went wrong",
          status: false,
        });
        res.send({
          error: err,
          statusMessage: "something went wrong",
          status: false,
        });
      } else {
        if (result !== null) {
          axios
            .get(`https://api.github.com/users/${result["Github"]}`)
            .then((response) => {
              const githubData = {
                login: response.data.login,
                id: response.data.id,
                avatar: response.data.avatar_url,
                url: response.data.url,
                name: response.data.name,
                company: response.data.company,
                bio: response.data.bio,
                repos: response.data.public_repos,
                followers: response.data.followers,
              };

              const findProject = new Promise((resolve, reject) => {
                Project.find(
                  { Email: result.Email },
                  async (err, projectResult) => {
                    if (err) {
                      console.log(`[-]  `, {
                        error: err,
                        statusMessage: "something went wrong",
                        status: false,
                      });
                      res.send({
                        error: err,
                        statusMessage: "something went wrong",
                        status: false,
                      });
                    } else {
                      resolve(projectResult);
                    }
                  }
                );
              });
              const findBlogs = new Promise((resolve, reject) => {
                Blog.find({ Email: result.Email }, async (err, blogResult) => {
                  if (err) {
                    console.log(`[-]  `, {
                      error: err,
                      statusMessage: "something went wrong",
                      status: false,
                    });
                    res.send({
                      error: err,
                      statusMessage: "something went wrong",
                      status: false,
                    });
                  } else {
                    resolve(blogResult);
                  }
                });
              });
              if (!result.Visited.includes(req.body.tokenId)) {
                console.log(result.Visited);
                User.updateOne(
                  { _id: req.body.id },
                  { $push: { Visited: req.body.tokenId } },
                  (err, result) => {
                    console.log("[+]", result);
                  }
                );
              }
              findProject.then((projectResult) => {
                findBlogs.then((blogResult) => {
                  const { Visited, ...userResult } = result;
                  result.userVisited = result.Visited.length;
                  console.log({
                    data: userResult,
                    blog: blogResult,
                    projects: projectResult,
                    githubData,
                    status: true,
                  });
                  res.send({
                    data: result,
                    blog: blogResult,
                    projects: projectResult,
                    githubData,
                    status: true,
                  });
                });
              });
            })

            .catch((error) => {
              console.log({
                error,
                data: result,
                status: true,
              });
              res.send({
                data: result,
                status: true,
              });
            });
        } else {
          console.log(`[-]  `, {
            statusMessage: "No account founded",
            status: false,
          });
          res.send({
            statusMessage: "no account founded",
            status: false,
          });
        }
      }
    }
  ).clone();
};
