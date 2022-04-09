const axios = require("axios");
const { User } = require("../../models/User");

exports.getBlogs = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  await User.find({ _id: req.body.tokenId }, "Devto", async (err, result) => {
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
    } else if (result[0].Devto === undefined) {
      console.log(`[-]  `, {
        statusMessage: "No devto account attached",
        status: false,
      });
      res.send({
        statusMessage: "No devto account attached",
        status: false,
      });
    } else {
      var blogs = [];

      await axios
        .get(`https://dev.to/api/articles?username=${result[0].Devto}`)
        .then((response) => {
          response.data.forEach((element) => {
            blogs.push({
              id: element.id,
              title: element.title,
              description: element.description,
              date: element.readable_publish_date,
              positive_count: element.positive_reactions_count,
              url: element.url,
              tags: element.tag_list,
            });
          });

          res.send({
            blogs,
            status: true,
          });
        })
        .catch((error) => {
          console.log({
            error,
            status: false,
          });
          res.send({
            error,
            status: false,
          });
        });
    }
  }).clone();
};
