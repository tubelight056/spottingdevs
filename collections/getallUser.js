const { User } = require("../models/User");
const { Project } = require("../models/Projects");
const axios = require("axios");

exports.getAllUser = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  await User.find(
    {},
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
          result.forEach((result) => {
            console.log(result);
            axios
              .get(`https://api.github.com/users/${result["Github"]}`)
              .then((response) => {
                result = {
                  ...result,
                  githubData: {
                    login: response.data.login,
                    id: response.data.id,
                    avatar: response.data.avatar_url,
                    url: response.data.url,
                    name: response.data.name,
                    company: response.data.company,
                    bio: response.data.bio,
                    repos: response.data.public_repos,
                    followers: response.data.followers,
                  },
                };
                console.log(result);
              })
              .catch((error) => {
                console.log(error, "s");
                console.log({
                  data: result,
                  status: true,
                });
                res.send({
                  data: result,
                  //   projects: projectresult,
                  status: true,
                });
              });
          });

          res.send({
            data: result,
            status: true,
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
