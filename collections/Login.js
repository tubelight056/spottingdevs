const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const { GetParticularlyScore } = require("./ParticularScore");
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
    await User.findOne(
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
          if (result === null) {
            console.log(`[-]  `, {
              statusMessage: "No account founded",
              status: false,
            });
            res.send({
              statusMessage: "no account founded",
              status: false,
            });
          } else {
            console.log(result);

            const data = {
              id: result._id,
              Name: result.Name,
              Email: result.Email,
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
                  name: result.Name,
                  email: result.Email,
                  token: token,
                  status: true,
                });
              }
            );
          }
        }
      }
    ).clone();
  }
};
