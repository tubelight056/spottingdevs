const { User } = require("../../models/User");
const { Project } = require("../../models/Projects");
require("dotenv").config();
const axios = require("axios");
const { score } = require("../scoreCalculator");

exports.createProjects = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (req.body.Github_id == undefined) {
    console.log(`[-]  `);
    console.log({
      statusMessage: "all details are required",
      status: false,
    });
    res.send({
      statusMessage: "all details are required",
      status: false,
    });
  } else {
    await User.find({ _id: req.body.tokenId }, async (err, result) => {
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
        var data = {};
        await axios
          .get(`https://api.github.com/users/${result[0]["Github"]}/repos`)
          .then((response) => {
            response.data.forEach((element) => {
              if (element.id === req.body.Github_id) {
                data = {
                  userId: req.body.tokenId,
                  Email: req.body.tokenEmail,
                  Github_id: element.id,
                  Name: element.name,
                  Full_name: element.full_name,
                  Description: element.description,
                  Stargazers_count: element.stargazers_count,
                  Visibility: element.visibility,
                  Url: element.url,
                  Language: element.language,
                  HostedLink: req.body.hostedlink,
                  Tags: req.body.tags,
                };
              }
            });
            if (data === {}) {
              console.log(`[-]  `, {
                statusMessage: "something went wrong",
                status: false,
              });
              res.send({
                statusMessage: "invalid id",
                status: false,
              });
            } else {
              const newProject = new Project(data);
              newProject
                .save()
                .then((data) => {
                  score(req.body.tokenId);
                  console.log(`[+]  `, {
                    statusMessage: "registered successfully",
                    status: true,
                  });
                  res.send({
                    statusMessage: "registered successfully",
                    status: true,
                  });
                })
                .catch(async (err) => {
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
                });
            }
          })
          .catch((error) => {
            console.log({
              error,
              status: false,
            });
            res.send({
              error,
              status: false,
            });
          });
      }
    }).clone();
  }
};
