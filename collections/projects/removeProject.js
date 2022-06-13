const { User } = require("../../models/User");
const { Project } = require("../../models/Projects");
require("dotenv").config();
const axios = require("axios");
const { score } = require("../scoreCalculator");

exports.RemoveProjects = async (req, res) => {
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
    await Project.deleteMany(
      { Github_id: req.body.Github_id },
      async (error, result) => {
        if (error) {
          console.log({
            error,
            status: false,
          });
          res.send({
            error,
            status: false,
          });
        } else {
          score(req.body.tokenId);
          console.log({
            data: result,
            status: true,
          });
          res.send({
            data: result,
            status: true,
          });
        }
      }
    );
  }
};
