const { User } = require("../models/User");

exports.getParticularlySkilled = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  try {
    if (req.body.skills === undefined || req.body.skills === []) {
      console.log(`[-]  `, {
        statusMessage: "Atleast a skill is required ",
        status: false,
      });
      res.send({
        statusMessage: "Atleast a skill is required ",
        status: false,
      });
    }
    await User.find(
      { Skills: { $in: [...req.body.skills] } },
      { Password: 0, Visited: 0 },
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
          if (result !== []) {
            console.log({
              data: result,
              status: true,
            });
            res.send({
              data: result,
              status: true,
            });
          } else {
            console.log(`[-]  `, {
              statusMessage: "No Users founded",
              status: false,
            });
            res.send({
              statusMessage: "no  Users founded",
              status: false,
            });
          }
        }
      }
    ).clone();
  } catch (err) {
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
  }
};
