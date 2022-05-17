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
  await User.find(query, { Password: 0, Visited: 0 }, async (err, result) => {
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
        // const newworld = new Promise((resolve, reject) => {
        //   let fullDetails = [];
        //   result.forEach(async (singleresult) => {
        //     score(singleresult._id).then(async (data) => {
        //       setTimeout(() => {
        //         fullDetails.push({
        //           ...singleresult["_doc"],
        //           score: data,
        //         });
        //       }, [2500]);
        //     });
        //   });
        //   resolve(fullDetails);
        // });
        setTimeout(() => {
          console.log(result);
          res.send({
            data: result,
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
  }).clone();
};
