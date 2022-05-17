const medium = require("@giuseppecampanelli/medium-api");
const { User } = require("../../models/User");

exports.GetMediumPost = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  User.findOne({ _id: req.body.tokenId }, "Medium", async (err, userResult) => {
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
      console.log(userResult);
      medium.profile.getRecentPosts(userResult.Medium).then((result) => {
        console.log(result);
        res.send("hai");
      });

      if (userResult !== null) {
        medium.profile.getRecentPosts(userResult.Medium).then((result) => {
          console.log(result);
          res.send("hai");
        });
      }
    }
  });
};
