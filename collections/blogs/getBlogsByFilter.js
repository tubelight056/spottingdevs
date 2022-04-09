const { Blog } = require("../../models/Blogs");

exports.getBlogssByFilter = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  await Blog.find(
    { Title: { $regex: `${req.body.search}+[a-z]*`, $options: "ig" } },
    async (error, result) => {
      if (error) {
        console.log({
          error,
          status: false,
        });
        res.send({
          error,
          status: false,
        });
      } else {
        console.log({
          data: result,
          status: true,
        });
        res.send({
          data: result,
          status: true,
        });
      }
    }
  ).clone();
};
