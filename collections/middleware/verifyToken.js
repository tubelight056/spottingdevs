const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.headers);

  if (typeof req.headers["authorization"] !== undefined) {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    await jwt.verify(token, process.env.SEC_KEY, async (err, data) => {
      if (err) {
        console.log({
          err: err,
          status: false,
          statusMessage: "Token Forbidden",
        });
        res.send({
          err: err,
          status: false,
          statusMessage: "Token Forbidden",
        });
      } else {
        console.log(data);
        req.body.tokenName = data.Name;
        req.body.tokenId = data.id;
        req.body.tokenEmail = data.Email;
        next();
      }
    });
  } else {
    console.log({
      err: err,
      status: false,
      statusMessage: "Token needed",
    });
    res.send({
      err: err,
      status: false,
      statusMessage: "Token needed",
    });
  }
};
