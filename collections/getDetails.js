const { User } = require("../models/User");
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
          console.log({
            data: result[0],
            status: true,
          });
          res.send({
            data: result[0],
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
