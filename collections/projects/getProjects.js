const axios = require("axios");
const { User } = require("../../models/User");

exports.getProjects = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  await User.find({ _id: req.body.tokenId }, "Github", async (err, result) => {
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
      var projects = [];
      await axios
        .get(`https://api.github.com/users/${result[0]["Github"]}/repos`)
        .then((response) => {
          response.data.forEach((element) => {
            projects.push({
              id: element.id,
              name: element.name,
              full_name: element.full_name,
              description: element.description,
              stargazers_count: element.stargazers_count,
              visibility: element.visibility,
              url: element.url,
              language: element.language,
            });
          });
          console.log(projects);
          res.send({
            projects,
            status: true,
          });
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
};
