const { Blog } = require("../models/Blogs");
const axios = require("axios");
exports.updateALLBlogs = async () => {
  console.log("[+] update all is working:)");
  await Blog.find({}, "blogId", async (err, result) => {
    result.forEach((element) => {
      axios
        .get(`https://dev.to/api/articles/${element.blogId}`)
        .then((response) => {
          if (response.data !== {}) {
            Blog.updateOne(
              { blogId: element.blogId },
              {
                $set: {
                  Title: response.data.title,
                  Description: response.data.description,
                  Date: response.data.readable_publish_date,
                  positive_count: response.data.positive_reactions_count,
                  url: response.data.url,
                  tags: response.data.tags,
                },
              },
              async (err, result) => {
                if (!err) {
                  console.log(`[+]  `, {
                    statusMessage: "registered successfully",
                    status: true,
                  });
                } else {
                  console.log(`[-]  `, {
                    error: err,
                    statusMessage: "something went wrong",
                    status: false,
                  });
                }
              }
            ).clone();
          } else if (response.data === {}) {
            Blog.deleteOne({ blogId: element.blogId }, async (err, result) => {
              if (err) {
                console.log(`[+]  `, {
                  statusMessage: "registered successfully",
                  status: true,
                });
              } else {
                console.log(`[-]  `, {
                  error: err,
                  statusMessage: "something went wrong",
                  status: false,
                });
              }
            }).clone();
          } else {
            console.log(`[-]  `, {
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
        });
    });
  }).clone();
};
