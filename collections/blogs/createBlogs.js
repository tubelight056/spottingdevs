const { Blog } = require("../../models/Blogs");
require("dotenv").config();
const axios = require("axios");
exports.createBlogs = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (req.body.Blog_id === undefined) {
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
    var data = {};
    await axios
      .get(`https://dev.to/api/articles/${req.body.Blog_id}`)
      .then((response) => {
        if (response.data !== {}) {
          data = {
            Email: req.body.tokenEmail,
            blogId: response.data.id,
            Title: response.data.title,
            Description: response.data.description,
            Date: response.data.readable_publish_date,
            positive_count: response.data.positive_reactions_count,
            url: response.data.url,
            tags: response.data.tags,
          };
          const newBlog = new Blog(data);
          newBlog
            .save()
            .then((data) => {
              console.log(`[+]  `, {
                statusMessage: "registered successfully",
                status: true,
              });
              res.send({
                statusMessage: "registered successfully",
                status: true,
              });
            })
            .catch(async (err) => {
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
            });
        } else if (response.data === {}) {
          console.log(`[-]  `, {
            statusMessage: "invalid id",
            status: false,
          });
          res.send({
            statusMessage: "invalid id",
            status: false,
          });
        } else {
          console.log(`[-]  `, {
            statusMessage: "something went wrong",
            status: false,
          });
          res.send({
            statusMessage: "something went wrong",
            status: false,
          });
        }
      })
      .catch((error) => {
        console.log({
          error,
          statusMessage: "something went wrong",
          status: false,
        });
        res.send({
          error,
          statusMessage: "something went wrong",
          status: false,
        });
      });
  }
};
