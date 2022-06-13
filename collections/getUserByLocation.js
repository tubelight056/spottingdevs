const { User } = require("../models/User");
const { Project } = require("../models/Projects");
const { score } = require("./scoreCalculator");

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  console.log(dist);
  return dist;
  // var a = lat1 - lat2;
  // var b = lon1 - lon2;
  // var c = Math.sqrt(a * a + b * b);
  // return c;
}

exports.getAllUserByLocation = async (req, res) => {
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
        let calDistance = new Promise((resolve, reject) => {
          updatedResult = [];
          result.forEach(async (user) => {
            Distance = distance(
              user.Location[0],
              user.Location[1],
              req.body.location[0],
              req.body.location[1],
              "K"
            );
            console.log(Distance);
            updatedResult.push({ Distance, user });
            if (result.length === updatedResult.length) {
              resolve(updatedResult);
            }
          });
        });

        calDistance.then((data) => {
          res.send({
            data,
            status: true,
          });
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
