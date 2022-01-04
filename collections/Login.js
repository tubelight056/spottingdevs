const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (req.body.email == undefined) {
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
    await User.find(
      { Email: req.body.email },
      "_id Name Email",
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
            const data = {
              id: result[0]._id,
              Name: result[0].Name,
              Email: result[0].Email,
            };
            await jwt.sign(
              data,
              process.env.SEC_KEY,
              { expiresIn: "144000s" },
              async (err, token) => {
                console.log(`[+]  `, {
                  result,
                  status: true,
                });
                res.send({
                  name: result[0].Name,
                  email: result[0].Email,
                  token: token,
                  status: true,
                });
              }
            );
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
  }
};
