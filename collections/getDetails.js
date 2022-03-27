const { User } = require("../models/User");
const { Project } = require("../models/Projects");
const axios = require("axios");

require("dotenv").config();

exports.getDetails = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  await User.find(
    { _id: req.body.tokenId },
    " Name Email DateOfBirth profileImgUrl Skills Education Experience Portfolio Github Devto Medium",
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
          Project.find(
            { Email: req.body.tokenEmail },
            async (err, projectresult) => {
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
                axios
                  .get(`https://api.github.com/users/${result[0]["Github"]}`)
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
                    console.log({
                      data: result[0],
                      projects: projectresult,
                      githubData,
                      status: true,
                    });
                    res.send({
                      data: result[0],
                      projects: projectresult,
                      githubData,
                      status: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error, "s");
                    console.log({
                      data: result[0],
                      projects: projectresult,
                      status: true,
                    });
                    res.send({
                      data: result[0],
                      projects: projectresult,
                      status: true,
                    });
                  });
              }
            }
          ).clone();
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
