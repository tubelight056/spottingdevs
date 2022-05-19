const { User } = require("../models/User");
const axios = require("axios");

require("dotenv").config();

exports.upadteUserDetails = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  const { tokenEmail, tokenId, tokenName, ...data } = req.body;
  await User.updateOne({ _id: tokenId }, data, async (err, result) => {
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
      console.log(result);
      if (result.acknowledged == true) {
        console.log(`[+]  `, {
          statusMessage: "successfully updated",
          status: true,
        });
        res.send({
          statusMessage: "successfully updated",
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
  }).clone();
};
