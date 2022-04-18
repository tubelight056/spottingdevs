const { User } = require("../models/User");
const { Project } = require("../models/Projects");
const axios = require("axios");
const { score } = require("./scoreCalculator");

exports.getAllUser = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  const query =
    req.body.search === undefined
      ? {}
      : { Name: { $regex: `${req.body.search}+[a-z]*`, $options: "ig" } };
  await User.find(
    query,
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
          let fullDetails = [];
          result.forEach((result) => {
            score(result._id).then((data) => {
              fullDetails.push({
                ...result["_doc"],
                score: data,
              });
            });
          });

          setTimeout(() => {
            console.log(fullDetails);
            res.send({
              data: fullDetails,
              status: true,
            });
          }, [5000]);
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
